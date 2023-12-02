import { api } from '@/axios';
export default {
    changeStatus (id, payload) {
        return api().patch(`admin/return-orders/${id}`, payload)
    }
}
