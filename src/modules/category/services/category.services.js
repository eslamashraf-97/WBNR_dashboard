import { api } from '@/axios';
export default {
    createCategory (payload) {
        return api().post('admin/product-category', payload)
    },
    editCategory (payload) {
        return api().patch(`admin/product-category/${payload.id}`, payload)
    }
}
