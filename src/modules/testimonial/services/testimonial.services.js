import { api } from '@/axios';
export default {
    createTestimonial (payload) {
        return api().post('admin/testimonial', payload)
    },
}
