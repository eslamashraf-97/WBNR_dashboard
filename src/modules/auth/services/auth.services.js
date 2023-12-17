import { api } from '@/axios';
export default {
    login (payload) {
        return api().post('admin/login', payload)
    },
    getInfo () {
        return api().get('admin/who-am-i')
    },
    sendFcmToken (data) {
        return api().post(`customer/profile/post-token`, data)
    }
}
