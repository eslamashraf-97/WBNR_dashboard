import { api } from '@/axios';
export default {
    getAllCollections () {
        return api().get('admin/firebase/collections')
    },
}
