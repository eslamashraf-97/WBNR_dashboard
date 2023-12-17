import { api } from '@/axios';
export default {
    getAllCategory () {
        return api().get('admin/product-category/row')
    },
    createCategory (payload) {
        return api().post('admin/product-category', payload)
    },
    editCategory (payload) {
        return api().patch(`admin/product-category/${payload.id}`, payload)
    },
    getAllIcons () {
        return api().get('admin/icons')
    }
}
