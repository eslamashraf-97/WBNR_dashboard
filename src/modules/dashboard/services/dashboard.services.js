import { api } from '@/axios';
export default {
    getAllStatistics (country) {
        if (country) {
            return api().get(`admin/dashboard-statistics?country_id=${country}`)
        } else {
            return api().get(`admin/dashboard-statistics`)
        }
    }
}
