<template>

  <ValidationForm @submit="onsubmit" 	v-slot="{ values }" :initialValues="details" >
    <div class="ld:grid grid-cols-2 gap-2">
      <InputField type="text" validation="required" placeholder="الاسم باللغه العربية" name="name_ar"/>
      <InputField type="text" validation="required" placeholder="الاسم باللغه الانجليزية" name="name_en"/>
      <div class="col-span-2 mb-6">
        <Upload name="image" label="الصورة الرئيسية" @upload="uploadImage"/>
      </div>
      <MainTextarea class="col-span-2" name="description" plceholder="تفاصيل"></MainTextarea>
    </div>
    <div class="sign-up__button-action mt-4">
      <AppButton class="" type="submit" :loading="loading" submit-title="حفظ القسم"></AppButton>
    </div>
  </ValidationForm>
</template>
<script setup>
import { ref } from 'vue'

import MainSelect from "@/components/global/formElements/MainSelect.vue"
import MainTextarea from "@/components/global/formElements/MainTextarea.vue"
import Upload from "@/components/global/formElements/Upload.vue"
import categoryServices from "../services/category.services.js"

const props = defineProps(['details', 'selectedID'])
const emit = defineEmits(['finish'])


let image = props.details?.image || ''

let loading = ref(false)


function uploadImage (val) {
  image = val
}

function onsubmit (values) {
  loading.value = true
  if (Object.keys(props.details).length !== 0) {
    categoryServices.editCategory({...values, image }).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  } else {
    categoryServices.createCategory({...values, image, parent_id: props.selectedID }).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  }
}

</script>
<style>

</style>
