import { api } from '@/axios';
export default {
    getAll () {
        return api().get('admin/faq')
    },
    createFaq (payload) {
        return api().post('admin/faq', payload)
    },
    editFaq (payload) {
        return api().patch(`admin/faq/${payload.id}`, payload)
    }
}
