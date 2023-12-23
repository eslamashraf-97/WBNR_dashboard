<template>
  <Box class="p-5">
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">إضافة رأى</h5>
    </div>
    <div>
      <ValidationForm @submit="onsubmit" 	v-slot="{ values }" :initialValues="details">
        <Upload name="marketer_image" label="ارفع صورتك" @upload="uploadImage"/>
        <InputField type="text" validation="required" placeholder="اسمك" name="marketer_name"/>
        <InputField type="text" validation="required" placeholder="رأيك" name="testimonial"/>

        <div class="sign-up__button-action mt-4">
          <AppButton class="" type="submit" :loading="loading" submit-title="حفظ "></AppButton>
        </div>
      </ValidationForm>
    </div>
  </Box>
</template>

<script setup>
import { ref } from "vue";
import testimonialService from '../services/testimonial.services'
import Upload from "@/components/global/formElements/Upload.vue"

const loading = ref(false)
const details = ref({})
const marketer_image = ref()
function uploadImage (val) {
  marketer_image.value = val
}
function onsubmit(val) {
  loading.value = true
  testimonialService.createTestimonial({ ...val, marketer_image: marketer_image.value }).finally(()=>{
    loading.value = false
  })
}
</script>
