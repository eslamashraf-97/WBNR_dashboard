import { api } from '@/axios';
export default {
    update (id,payload) {
        return api().patch('admin/chat-auto-respond/'+id, payload)
    }
}
