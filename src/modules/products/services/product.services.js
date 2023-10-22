import { api } from '@/axios';
export default {
    createProduct (payload) {
        return api().post('admin/products', payload)
    },
    editProduct (payload) {
        return api().patch(`admin/products/${payload.id}`, payload)
    }
}
