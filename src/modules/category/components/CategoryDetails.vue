<template>

  <ValidationForm @submit="onsubmit" 	v-slot="{ values }" :initialValues="details" >
    <div class="ld:grid grid-cols-2 gap-2">
      <InputField type="text" validation="required" placeholder="الاسم باللغه العربية" name="name_ar"/>
      <InputField type="text" validation="required" placeholder="الاسم باللغه الانجليزية" name="name_en"/>
      <MainSelect :options="allIcons" name="svg_icon" optionLabel="svg_icon" optionValue="svg_icon" validation="required" placeholder="اختر صوره القسم">
        <template v-slot:value="data">
          <img class="w-8 h-8" v-if="data.slotProps?.value" :src="data.slotProps?.value" />

        </template>
        <template v-slot:option="data">
          <img class="w-10 h-10" :src="data.slotProps?.option?.svg_icon" />
        </template>
      </MainSelect>

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
import categoryServices from "../services/category.services.js"

const props = defineProps(['details', 'selectedID'])
const emit = defineEmits(['finish'])



let loading = ref(false)
let allIcons = ref([])

function onsubmit (values) {
  loading.value = true
  if (Object.keys(props.details).length !== 0) {
    categoryServices.editCategory({...values }).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  } else {
    categoryServices.createCategory({...values, parent_id: props.selectedID }).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  }
}
function getIcon () {
  categoryServices.getAllIcons().then(res => {
    console.log('res => ', res);
    allIcons.value = res.data.data
  })
}
getIcon()
</script>
<style>

</style>
