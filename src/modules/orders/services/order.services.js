import { api } from '@/axios';
export default {
    changeStatus (id, payload) {
        return api().patch(`admin/orders/${id}`, payload)
    }
}
