<template>
  <Box class="p-5">
    <div class="flex justify-between items-center border-b-2 pb-3 mb-4">
      <h5 class="text-md mb-4">التواصل الاجتماعى</h5>
      <app-button v-if="$hasPer('products:create')" submit-title="إضف جديد" class="rounded-lg font-medium !py-3" @click="visible = true; details={}; edit=false">
        <template v-slot:icon>
          +
        </template>
      </app-button>
    </div>
    <main-table :loadingTable="loadingTable" actionDots :list_url="'admin/social-links'" :columns="columns" :actions="actions">
      <template v-slot:url="{data}">
        <img  class="image-url" :src="data.url" :alt="data.url">
      </template>
    </main-table>
    <Dialog v-model:visible="visible" maximizable  modal :header="edit ?  'تعديل' : 'إضافة'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div>
        <ValidationForm @submit="onsubmit" :initialValues="details"	v-slot="{ values }">
          <InputField type="text" validation="required" placeholder="اللينك" name="name"/>
          <Upload name="url" label="رفع صورة" @upload="uploadImage"  :imageValue="url"/>
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
const url = ref(false)
const edit = ref(false)
const loadingTable = ref(false)
const columns = [
  {
    header: 'الاسم',
    field: 'name'
  },
  {
    header: 'الصوره',
    field: 'url'
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
      url.value = val.url
      edit.value = true
    }
  },
  {
    text: 'مسح',
    icon:'pi pi-trash',
    action: (val) => window.showDeleteModal({
      title: 'تواصل',
      id: val.id,
      url: 'admin/social-links',
    })
  }
]
function uploadImage (val) {
  url.value = val
}
function onsubmit(data) {
  loading.value = true
  if(edit.value) {
    testimonialServices.editSocialLinks(details.value.id, { ...data, url: url.value }).then(res => {
      loading.value = false
      visible.value = false
      loadingTable.value = true
      edit.value = false
    })
  } else {
    testimonialServices.createSocialLinks({ ...data, url: url.value }).then(res => {
      loading.value = false
      visible.value = false
      loadingTable.value = true
      edit.value = false
    })
  }
}
</script>
<style>
.image-url {
  width: 30px;
  height: 30px;
}

</style>
