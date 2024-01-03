import { api } from '@/axios';
export default {
    changeStatus (id, payload) {
        return api().patch(`admin/orders/${id}`, payload)
    },
    addItemToOrder (id, payload) {
        return api().patch(`admin/orders/add-item/${id}`, payload)
    }
}
