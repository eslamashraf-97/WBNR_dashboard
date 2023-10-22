import { api } from '@/axios';
export default {
    getAll () {
        return api().get('admin/countries')
    },
    createProduct (payload) {
        return api().post('admin/countries', payload)
    },
    editProduct (payload) {
        return api().patch(`admin/countries/${payload.id}`, payload)
    }
}
