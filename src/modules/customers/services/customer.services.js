import { api } from '@/axios';
export default {
    getAll () {
        return api().get('admin/customers')
    }
}
