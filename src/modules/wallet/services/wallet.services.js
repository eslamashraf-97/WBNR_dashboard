import { api } from '@/axios';
export default {
    changeStatus (id, payload) {
        return api().post(`admin/wallet/request/withdraw-requests/${id}`, payload)
    }
}
