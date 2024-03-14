import { api } from "@/axios";
export default {
  createTestimonial(payload) {
    return api().post("admin/testimonial", payload);
  },
  editTestimonial(payload) {
    console.log('payload', payload)
    return api().patch(`admin/testimonial/${payload.id}`, payload);
  },
  createDeliveryNotes(payload) {
    return api().post("admin/delivery-notes", payload);
  },
  editDeliveryNotes(id, payload) {
    return api().patch(`admin/delivery-notes/${id}`, payload);
  },
  createSocialLinks(payload) {
    return api().post("admin/social-links", payload);
  },
  editSocialLinks(id, payload) {
    return api().patch(`admin/social-links/${id}`, payload);
  },
  getTestimonial(id) {
    return api().get(`admin/testimonial/${id}`);
  },
};
