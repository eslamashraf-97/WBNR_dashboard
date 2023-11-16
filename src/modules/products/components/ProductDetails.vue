<template>

  <ValidationForm @submit="onsubmit" 	v-slot="{ values }" :initialValues="details" >
    <div class="grid grid-cols-2 gap-2">
      <InputField type="text" validation="required" placeholder="كود المنتج" name="code"/>
      <InputField type="text" validation="required" placeholder="اسم التاجر" name="merchant_name"/>
      <InputField type="text" validation="required" placeholder="الاسم باللغه العربية" name="title_ar"/>
      <InputField type="text" validation="required" placeholder="الاسم باللغه الانجليزية" name="title_en"/>
      <InputField type="text" validation="required|numeric" placeholder="السعر" name="price"/>
      <InputField type="text" validation="required|numeric" placeholder="الكمية" name="stock"/>
      <InputField type="text" validation="required|numeric" placeholder="اكثر قيمة عمولة" name="maxCommission"/>
      <InputField type="text" validation="required|numeric" placeholder="اقل قيمة عمولة" name="minCommission"/>
      <MainSelect :options="allCategories" name="category_id" validation="required" optionLabel="name" optionValue="id" placeholder="اختر القسم"/>
      <MainSelect :options="countries" name="country_id" optionLabel="name" optionValue="id"  validation="required" placeholder="اختر البلد"/>
      <div class="col-span-2 mb-6">
        <Upload name="featured_image" label="الصورة الرئيسية" @upload="uploadImage"/>
      </div>
      <div class="col-span-2 flex flex-wrap gap-2 overflow-hidden">
        <Upload name="images" :label="` صوره ${key + 1}`" v-for="(item, key) in images" :key="key" @upload="uploadMultiImage"/>
        <section class="relative cursor-pointer md:w-[216px] h-[132px] rounded-xl border-2 border-mutedColor border-dashed flex items-center justify-center flex-col" @click="addNewImage">
            <div class="flex flex-col items-center">
              <p class="text-gray-300 text-md mt-2 w-100 text-center font-semibold">
                رفع صورة جديدة +
              </p>
            </div>
        </section>
      </div>

      <InputField class="col-span-2" type="text" validation="" placeholder="لينك فيديو" name="video"/>

      <div class="my-2 col-span-2">
        <label class="text-black text-lg">خصائص المنتج</label>
        <FieldArray name="variants" v-slot="{ fields, push, remove }">
          <div v-for="(field, idx) in fields" :key="field.key" class="p-3 rounded-2xl bg-gray-200 w-100 mb-2">
            <label class="text-black text-lg">معلومات رئيسية عن الخاصية</label>
            <div class="grid md:grid-cols-3 gap-x-8 items-center">
              <MainSelect :options="['كتابة','الوان']" :name="`variants[${idx}].type`"  label="اختر النوع" validation="required" placeholder="اختر النوع"/>
              <InputField :name="`variants[${idx}].name_ar`"
                          class="col-span-1"
                          label="الاسم بالعربى"
                          validation="required"
              />
              <InputField :name="`variants[${idx}].name_en`"
                          class="col-span-1"
                          label="الاسم باللغه الانجليزية"
                          validation="required"
              />
<!--              <app-button type="button" class="col-span-1 bg-red-700" @click="remove(idx)">-->
<!--                مسح-->
<!--              </app-button>-->
            </div>
            <label class="text-black text-lg">قيم الخاصية</label>
            <FieldArray :name="`variants[${idx}].values`" v-slot="{ fields: f, push: p, remove: r }">
              <div v-for="(fieldIn, ix) in f" :key="fieldIn.key" class="p-3 rounded-2xl bg-gray-200 w-100 mb-2">
                <div v-if="field.value.type == 'كتابة'" class="grid grid-cols-2 gap-4">
                  <InputField :name="`variants[${idx}].values[${ix}].name_ar`"
                              label="الاسم بالعربى"
                              validation="required"
                  />
                  <InputField :name="`variants[${idx}].values[${ix}].name_en`"
                              label="الاسم باللغه الانجليزية"
                              validation="required"
                  />
                </div>
                <div v-else-if="field.value.type == 'الوان'">
                  <InputField :name="`variants[${idx}].values[${ix}].name_ar`"
                              class="col-span-1 !py-1"
                              label="اختر اللون"
                              validation="required"
                              type="color"
                  />
                  <InputField v-if="false" :name="`variants[${idx}].values[${ix}].name_en`"
                              class="col-span-1 !py-1"
                              label="اختر اللون"
                              validation="required"
                              type="color"
                  />
                </div>
              </div>
              <app-button v-if="field.value.type" type="button" class="!text-primary-300 !p-0	bg-transparent border-0" @click="field.value.type == 'الوان' ? p({ name_ar: '', name_en: '0' }) : p({ name_ar: '', name_en: '' })">
                + أضف  قيمة جديده
              </app-button>
            </FieldArray>
          </div>
          <app-button type="button" class="!text-primary-300 !p-0	bg-transparent border-0" @click="push({ name_ar: '', name_en: '', values: [], type: '' })">
           + أضف  خاصية جديده
          </app-button>
        </FieldArray>
      </div>
      <label :for="id" class="capitalize p-0 font-semibold font-14 text-text-700" >تفاصيل المنتج</label>
      <MainTextarea class="col-span-2" name="description" plceholder="تفاصيل المنتج"></MainTextarea>
      <label :for="id" class="capitalize p-0 font-semibold font-14 text-text-700" >شرح المنتج</label>
      <MainTextarea class="col-span-2" name="explain" plceholder="شرح المنتج"></MainTextarea>
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
import categoryServices from "@modules/category/services/category.services";

const { countries } = useCountries()
const props = defineProps(['details'])
const emit = defineEmits(['finish'])

let featured_image = props.details?.featured_image || ''
let images = ref(props.details?.images || [
  {
    url: ''
  }])
let loading = ref(false)
const allCategories = ref([])

function getAllCategory () {
  categoryServices.getAllCategory().then(res => {
    allCategories.value = res.data.data
  })
}
getAllCategory()
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
