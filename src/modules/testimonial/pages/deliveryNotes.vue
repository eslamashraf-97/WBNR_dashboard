<template>
  <Box class="p-5">
    <div class="flex justify-between items-center border-b-2 pb-3 mb-4">
      <h5 class="text-md mb-4">ملاحظات الشحن</h5>
      <app-button v-if="$hasPer('products:create')" submit-title="إضف ملاحظه جديدة" class="rounded-lg font-medium !py-3" @click="visible = true; details={}; edit=false">
        <template v-slot:icon>
          +
        </template>
      </app-button>
    </div>
    <main-table :loadingTable="loadingTable" actionDots :list_url="'admin/delivery-notes'" :columns="columns" :actions="actions">
      <template v-slot:country="{data}">
        <div class="flex items-center gap-2 py-2" v-if="data?.country">
          <img class="flag" :src="data.country.image">
        </div>
      </template>
      <template v-slot:delivery_notes="{data}">
        <div class="flex items-center gap-2 py-2" v-if="data?.delivery_notes">
          <p v-html="data?.delivery_notes"></p>
        </div>
      </template>
      <template v-slot:image_src="{data}">
        <img  class="image-details" :src="data.image_src">
      </template>
    </main-table>
    <Dialog v-model:visible="visible" maximizable  modal :header="edit ?  'تعديل' : 'إضافة ملاحظه شحن'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div>
        <ValidationForm @submit="onsubmit" :initialValues="details"	v-slot="{ values }">
          <MainSelect :options="countries" name="country_id" optionLabel="name" optionValue="id"  validation="required" placeholder="اختر البلد"/>
          <Upload name="featured_image" label="رفع صورة" @upload="uploadImage"  :imageValue="image_src"/>
          <MainTextarea class="col-span-2" name="delivery_notes" plceholder="ملاحظات الشحن"></MainTextarea>
          <div class="sign-up__button-action mt-4">
            <AppButton class="" type="submit" :loading="loading" submit-title="حفظ "></AppButton>
          </div>
        </ValidationForm>
      </div>
    </Dialog>

  </Box>
</template>
<script setup>
import { ref } from 'vue'
import Upload from "@/components/global/formElements/Upload.vue"
import MainTextarea from "@/components/global/formElements/MainTextarea.vue"
import testimonialServices from "../services/testimonial.services";
import { useCountries } from "../../country/composables";

const visible = ref(false)
const details = ref(false)
const { countries } = useCountries()
const loading = ref(false)
const image_src = ref(false)
const edit = ref(false)
const loadingTable = ref(false)
const columns = [
  {
    header: 'المدينة',
    field: 'country'
  },
  {
    header: 'التفاصيل',
    field: 'delivery_notes'
  },
  {
    header: 'صورة المنتج',
    field: 'image_src'
  }
]
const actions = [
  {
    text: 'تعديل',
    icon:'pi pi-pencil',
    permission: 'products:edit',
    action: (val) => {
      details.value = val
      visible.value = true
      image_src.value = val.image_src
      edit.value = true
    }
  },
  {
    text: 'مسح',
    icon:'pi pi-trash',
    action: (val) => window.showDeleteModal({
      title: 'التفاصيل',
      id: val.id,
      url: 'admin/delivery-notes',
    })
  }
]
function uploadImage (val) {
  image_src.value = val
}
function onsubmit(data) {
  loading.value = true
  if(edit.value) {
    testimonialServices.editDeliveryNotes(details.value.id, { ...data, country_id: data.country_id.toString(), image_src: image_src.value }).then(res => {
      loading.value = false
      visible.value = false
      loadingTable.value = true
      edit.value = false
    })
  } else {
    testimonialServices.createDeliveryNotes({ ...data, country_id: data.country_id.toString(), image_src: image_src.value }).then(res => {
      loading.value = false
      visible.value = false
      loadingTable.value = true
      edit.value = false
    })
  }
}
</script>
<style>
.image-details {
  width: 70px !important;
  height: 70px;
  border-radius: 15px;
}

</style>
