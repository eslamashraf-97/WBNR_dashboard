import { api } from "@/axios";
export default {
  toggle(id,data) {
    return api().patch("/admin/contact-us/" + id, data);
  }
};
