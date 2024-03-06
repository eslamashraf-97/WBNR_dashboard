<script setup>
import { onMounted, ref, reactive } from "vue";
import testimonialService from "../services/testimonial.services";
import Upload from "@/components/global/formElements/Upload.vue";
import { useRoute } from "vue-router";
import { useForm } from "vee-validate";
const loading = ref(false);
const details = ref({
  marketer_name: "",
  testimonial: "",
  marketer_image: "",
});
const image = ref("");
const { handleSubmit, setValues } = useForm({
  initialValues: details.value,
});
const route = useRoute();
const id = route.params.id;
onMounted(async () => {
  if (id) {
    const { data } = await testimonialService.getTestimonial(id);
    console.log(data.data);
    setValues(data.data);
    image.value = data.data.marketer_image;
  }
});
// "id": 1,
//         "testimonial": "بدايتي مع تاجر هي بدايتي الحقيقة مع التجارة الإلكترونية، تاجر بتوفر فرصة بيزنس الأحلام ريسك قليل، ربح كبير، سيولة نقدية في فترة قصيرة جداً",
//         "marketer_name": "كريم بركات",
//         "description": "مصر",
//         "marketer_image": "https://taager.com/assets/img/landing/testimonials/man-1.svg"

function uploadImage(val) {
  image.value = val;
}
function onsubmit(val) {
  loading.value = true;
  testimonialService
    .createTestimonial({ ...val, marketer_image: marketer_image.value })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <Box class="p-5">
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">إضافة رأى</h5>
    </div>
    <div>
      {{ values }}
      <Upload
        name="marketer_image"
        label="ارفع صورتك"
        @upload="uploadImage"
        :imageValue="image"
      />
      <InputField
        type="text"
        validation="required"
        placeholder="اسمك"
        name="marketer_name"
      />
      <InputField
        type="text"
        validation="required"
        placeholder="رأيك"
        name="testimonial"
      />

      <div class="sign-up__button-action mt-4">
        <AppButton
          class=""
          type="submit"
          :loading="loading"
          submit-title="حفظ "
        ></AppButton>
      </div>
    </div>
  </Box>
</template>
