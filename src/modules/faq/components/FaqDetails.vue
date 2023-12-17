<template>

  <ValidationForm @submit="onsubmit" 	v-slot="{ values }" :initialValues="details" >
    <div class="ld:grid grid-cols-2 gap-2">
      <InputField type="text" validation="required" placeholder="السؤال باللغه العربية" name="question_ar"/>
      <InputField type="text" validation="required" placeholder="السؤال باللغه الانجليزية" name="question_en"/>
      <InputField type="text" validation="required" placeholder="الاجابة باللغه العربية" name="answer_ar"/>
      <InputField type="text" validation="required" placeholder="الاجابة باللغه الانجليزية" name="answer_en"/>
    </div>
    <div class="sign-up__button-action mt-4">
      <AppButton class="" type="submit" :loading="loading" submit-title="حفظ"></AppButton>
    </div>
  </ValidationForm>
</template>
<script setup>
import { ref } from 'vue'

import faqServices from '../services/faq.services'

// import { useFaqs } from "../../faq/composables/index";
// const { faqs } = useFaqs()
const props = defineProps(['details'])
const emit = defineEmits(['finish'])
let loading = ref(false)

function onsubmit (values) {
  loading.value = true
  if (Object.keys(props.details).length !== 0) {
    faqServices.editFaq({...values}).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  } else {
    faqServices.createFaq({...values}).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  }
}

</script>
<style>

</style>
