import { api } from '@/axios';
export default {
    getAll (payload) {
        return api().get('admin/governorates')
    },
    createGovernorate (payload) {
        return api().post('admin/governorates', payload)
    },
    editGovernorate (payload) {
        return api().patch(`admin/governorates/${payload.id}`, payload)
    }
}
