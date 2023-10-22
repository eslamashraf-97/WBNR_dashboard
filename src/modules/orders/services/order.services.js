import { api } from '@/axios';
export default {
    changeStatus (id, payload) {
        return api().get(`admin/orders/${id}`, payload)
    }
}
