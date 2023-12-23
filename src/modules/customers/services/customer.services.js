import { api } from '@/axios';
export default {
    getAll () {
        return api().get('admin/customers')
    },
    switchStatus (id, status) {
        return api().patch(`admin/customers/${id}`, {status})
    }
}
