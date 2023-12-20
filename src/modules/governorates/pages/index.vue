<template>
  <Box class="p-5">
    <Dialog v-model:visible="visible" maximizable  modal :header="'إضافة محافظة'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <productDetails @finish="loadingTable = true; visible = false" :details="details"/>
    </Dialog>
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">المحافظات</h5>
      <app-button submit-title="إضف محافظة جديده" class="rounded-lg font-medium !py-3" @click="visible = true">
        <template v-slot:icon>
          +
        </template>
      </app-button>
    </div>
    <div class="mb-4">
      <p>تصفية :</p>
      <div class="flex gap-4">
        <input type="text"  placeholder="بحث باسم المحافظه" class="filterInput w-full" v-model="filter.name" />
        <Dropdown
          class="w-full"
          :options="countries"
          optionLabel="name"
          optionValue="id"
          :inputClass="`max-w-full capitalize h-[47px]`"
          placeholder="اختر البلد"
          v-model="filter.country_id"
        >
        </Dropdown>
      </div>
    </div>

    <main-table actionDots :filters="filter" :list_url="'admin/governorates'" :loadingTable="loadingTable" :actions="actions"  :columns="columns">
      <template v-slot:name="{data}">
        <div class="flex items-center gap-2 py-2">
          <img class="flag" :src="data.country.image">
          <p>{{data.name}}</p>
        </div>
      </template>
      <template v-slot:delivery_cost="{data}">
        <div class="flex items-center gap-2 py-2">
          <p>{{data.delivery_cost}}</p>
          <p>{{data.country.currency}}</p>
        </div>
      </template>
    </main-table>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import Avatar  from 'primevue/avatar'
import productDetails from '../components/GovernorateDetails.vue'
import { useCountries } from "../../country/composables";

const { countries } = useCountries()
const loadingTable = ref(false)

const columns = [
  {
    header: 'اسم المحافظة',
    field: 'name'
  },
  {
    header: 'تكلفة الشحن',
    field: 'delivery_cost'
  },
]
const actions = [
  {
    text: 'تعديل',
    permission: 'areas:edit',
    icon:'pi pi-pencil',
    action: (val) => {
      details.value = val
      visible.value = true
    }
  },
  {
    text: 'مسح',
    permission: 'areas:soft_remove',
    icon:'pi pi-trash',
    action: (val) => window.showDeleteModal({
      title: 'محافظة',
      id: val.id,
      url: 'admin/governorates',
    })
  }
]
const details = ref({})
const visible = ref(false)
const filter = ref({
  country_id: null,
  name: null
});
</script>
