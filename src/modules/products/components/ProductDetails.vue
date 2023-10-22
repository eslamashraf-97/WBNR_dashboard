<template>

  <ValidationForm @submit="onsubmit" 	v-slot="{ values }" :initialValues="details" >
    <div class="grid grid-cols-2 gap-2">
      <InputField type="text" validation="required" placeholder="الاسم باللغه العربية" name="title_ar"/>
      <InputField type="text" validation="required" placeholder="الاسم باللغه الانجليزية" name="title_en"/>
      <InputField type="text" validation="required|numeric" placeholder="السعر" name="price"/>
      <InputField type="text" validation="required|numeric" placeholder="الكمية" name="stock"/>
      <InputField type="text" validation="required|numeric" placeholder="اكثر قيمة عمولة" name="maxCommission"/>
      <InputField type="text" validation="required|numeric" placeholder="اقل قيمة عمولة" name="minCommission"/>
      <MainSelect :options="[1,2,3,4,5,6]" name="category_id" validation="required" placeholder="اختر القسم"/>
      <MainSelect :options="countries" name="country_id" optionLabel="name" optionValue="id"  validation="required" placeholder="اختر البلد"/>
      <div class="col-span-2 mb-6">
        <Upload name="featured_image" label="الصورة الرئيسية" @upload="uploadImage"/>
      </div>
      <div class="col-span-2 flex flex-wrap gap-2 overflow-hidden">
        <Upload name="images" :label="` صوره ${key + 1}`" v-for="(item, key) in images" :key="key" @upload="uploadMultiImage"/>
        <section class="relative cursor-pointer md:w-[216px] h-[132px] h-full rounded-xl border-2 border-mutedColor border-dashed flex items-center justify-center flex-col" @click="addNewImage">
            <div class="flex flex-col items-center">
              <p class="text-gray-300 text-md mt-2 w-100 text-center font-semibold">
                رفع صورة جديدة +
              </p>
            </div>
        </section>
      </div>
      <MainTextarea class="col-span-2" name="description" plceholder="تفاصيل"></MainTextarea>
    </div>
    <div class="sign-up__button-action mt-4">
      <AppButton class="" type="submit" :loading="loading" submit-title="حفظ المنتج"></AppButton>
    </div>
  </ValidationForm>
</template>
<script setup>
import { ref } from 'vue'

import MainSelect from "@/components/global/formElements/MainSelect.vue"
import MainTextarea from "@/components/global/formElements/MainTextarea.vue"
import Upload from "@/components/global/formElements/Upload.vue"
import productServices from "../services/product.services.js"
import { useCountries } from "../../country/composables";

const { countries } = useCountries()
const props = defineProps(['details'])
const emit = defineEmits(['finish'])


let featured_image = props.details?.featured_image || ''
let images = ref(props.details?.images || [{
  url: ''
}])
let loading = ref(false)

function addNewImage () {
  if(images.value[images.value.length - 1 ].url) {
    images.value.push(
        {
          url: ''
        }
    )
  }
}
function uploadImage (val) {
  featured_image = val
}
function uploadMultiImage (val) {
  images.value[images.value.length - 1 ].url = val
}
function onsubmit (values) {
  loading.value = true
  if (Object.keys(props.details).length !== 0) {
    productServices.editProduct({...values, images: images.value, featured_image: featured_image, unit_id: "1" }).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  } else {
    productServices.createProduct({...values, images: images.value, featured_image: featured_image, unit_id: "1" }).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  }
}

</script>
<style>

</style>
