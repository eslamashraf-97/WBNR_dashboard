import { api } from '@/axios';
export default {
    getAll () {
        return api().get('admin/countries')
    },
    switchStatus (id, status) {
        return api().patch(`admin/countries/${id}/switch-status`, {status})
    }
}
