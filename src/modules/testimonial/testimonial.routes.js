import index from "./pages/index.vue";
import listTesti from "./pages/listTesti.vue";
import deliveryNotes from "./pages/deliveryNotes.vue";
import socialMediaLinks from "./pages/socialMediaLinks.vue";

export default [
  {
    name: "testimonials.create",
    path: "/testimonials/create",
    component: index,
  },
  {
    path: "/testimonials/:id",
    name: "testimonial.edit",
    component: index,
  },
  {
    path: "/testimonials",
    name: "testimonials",
    component: listTesti,
  },
  {
    name: "deliveryNotes",
    path: "/delivery-notes",
    component: deliveryNotes,
  },
  {
    name: "socialMediaLinks",
    path: "/social-media",
    component: socialMediaLinks,
  },
];
