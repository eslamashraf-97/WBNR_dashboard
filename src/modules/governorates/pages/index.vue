<template>
  <Box class="p-5">
    <Dialog v-model:visible="visible" maximizable  modal :header="'إضافة محافظة'" :style="{ width: '50vw' }">
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

    <main-table actionDots :list_url="'admin/governorates'" :loadingTable="loadingTable" :actions="actions"  :columns="columns">
    </main-table>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import Avatar  from 'primevue/avatar'
import productDetails from '../components/GovernorateDetails.vue'

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
    icon:'pi pi-pencil',
    action: (val) => {
      details.value = val
      visible.value = true
    }
  },
  {
    text: 'مسح',
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

</script>
