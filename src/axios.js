import axios from 'axios'
import { error, success } from './plugins/toast'
import routes from './router/index'
export function api(header = {}) {
	const apiClient = axios.create({
		baseURL:import.meta.env.VITE_APP_API_URL,
		// withCredentials: true,
		headers: {
			Authorization: localStorage.getItem('access_token')
				? `Bearer ${localStorage.getItem('access_token')}`
				: null,
			Accept: 'application/json',
			ContentType: 'application/json',
			'Accept-Language': localStorage.getItem('lang') || 'en',
			'Content-Language': localStorage.getItem('lang') || 'en',
			...header,
		},
	})
	apiClient.interceptors.response.use(
		(response) => {
			if (response.config.method !== 'get') {
				if (response.data?.message) {
					success('', response.data?.message)
				} else if (response.data?.data?.message) {
					success('', response.data?.data?.message)
				}
			}
			return response
		},
		(errors) => {
			console.log(errors?.response?.data?.message)
			if (errors?.response?.data) {
				if (errors.response.status === 401) {
					routes.push({ name: 'signIn' })
					error('error', errors?.response?.data?.message)
				} else {
					if(errors?.response?.data?.errors) {
						for (const [key, value] of Object.entries(errors?.response?.data?.errors)) {
							error(key, value.toString())
						}
					} else
						error('error', errors?.response?.data?.message)
				}
				return Promise.reject(errors)
			}
			return Promise.reject(errors)
		}
	)
	return apiClient
}
