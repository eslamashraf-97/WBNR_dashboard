import { api } from '@/axios';
export default {
    getAllStatistics () {
        return api().get('admin/dashboard-statistics')
    }
}
