import { api } from '@/axios';
export default {
    createProduct (payload) {
        return api().post('admin/products', payload)
    },
    gitAllProduct () {
        return api().get('admin/products?take=100')
    },
    editProduct (payload) {
        return api().patch(`admin/products/${payload.id}`, payload)
    },
    switchStatus (id, status) {
        return api().patch(`admin/products/${id}`, {is_active: status})
    }
}
