import { api } from '@/axios';
export default {
    changeStatus (id, payload) {
        return api().post(`admin/return-orders/${id}/decision`, payload)
    }
}
