import { api } from '@/axios';
export default {
    createWithdraw (payload) {
        return api().post('admin/finances', payload)
    }
}
