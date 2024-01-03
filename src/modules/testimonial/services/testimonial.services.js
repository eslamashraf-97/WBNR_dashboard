import { api } from '@/axios';
export default {
    createTestimonial (payload) {
        return api().post('admin/testimonial', payload)
    },
    createDeliveryNotes (payload) {
        return api().post('admin/delivery-notes', payload)
    },
    editDeliveryNotes (id,payload) {
        return api().patch(`admin/delivery-notes/${id}`, payload)
    },
    createSocialLinks (payload) {
        return api().post('admin/social-links', payload)
    },
    editSocialLinks (id,payload) {
        return api().patch(`admin/social-links/${id}`, payload)
    },
}
