import { api } from '@/axios';
export default {
    getAllBanner () {
        return api().get('admin/banner')
    },
    createBanner (payload) {
        return api().post('admin/banner', payload)
    },
    deleteBanner (id) {
        return api().delete(`admin/banner/${id}`)
    }
}
