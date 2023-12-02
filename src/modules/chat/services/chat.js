import { api } from '@/axios';
export function getAllCollections () {
    return api().get('admin/firebase/collections');
}
