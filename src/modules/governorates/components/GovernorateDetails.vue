<template>

  <ValidationForm @submit="onsubmit" 	v-slot="{ values }" :initialValues="details" >
    <div class="ld:grid grid-cols-2 gap-2">
      <InputField type="text" validation="required" placeholder="الاسم باللغه العربية" name="name_ar"/>
      <InputField type="text" validation="required" placeholder="الاسم باللغه الانجليزية" name="name_en"/>
      <InputField type="text" validation="required" placeholder="السعر" name="delivery_cost"/>
      <MainSelect :options="countries" name="country_id" optionLabel="name" optionValue="id"  validation="required" placeholder="اختر البلد"/>
    </div>
    <div class="sign-up__button-action mt-4">
      <AppButton class="" type="submit" :loading="loading" submit-title="حفظ المحافظه"></AppButton>
    </div>
  </ValidationForm>
</template>
<script setup>
import { ref } from 'vue'

import governorateService from '../services/governorate.services'
import MainSelect from "@/components/global/formElements/MainSelect.vue"

import { useCountries } from "../../country/composables";
const { countries } = useCountries()
const props = defineProps(['details'])
const emit = defineEmits(['finish'])
let loading = ref(false)

function onsubmit (values) {
  loading.value = true
  if (Object.keys(props.details).length !== 0) {
    governorateService.editGovernorate({...values}).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  } else {
    governorateService.createGovernorate({...values}).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  }
}

</script>
<style>

</style>
