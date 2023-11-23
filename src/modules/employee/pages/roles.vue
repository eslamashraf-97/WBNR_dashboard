<template>
  <Box class="p-5">
    <Dialog v-model:visible="visible" maximizable  modal :header="'إضافة دور عمل'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <roleDetails @finish="loadingTable = true; visible = false" :details="details"/>
    </Dialog>
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">الأدوار</h5>
      <app-button submit-title="إضف دور عمل" class="rounded-lg font-medium !py-3" @click="visible = true">
        <template v-slot:icon>
          +
        </template>
      </app-button>
    </div>

    <main-table actionDots  :loadingTable="loadingTable" :list_url="'admin/roles'" :actions="actions" :columns="columns">
      <template v-slot:status="{data}">
          <p :class="`status--${data.status}`"> {{ status[data.status] }} </p>
      </template>
      <template v-slot:description="{data}">
        <p v-html="data.description"></p>
      </template>
    </main-table>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import roleDetails from '@/modules/employee/components/roleDetails.vue'

const columns = [
  {
    header: 'الاسم',
    field: 'name'
  },
  {
    header: 'slug',
    field: 'slug'
  },
  {
    header: 'وصف',
    field: 'description'
  }
]
const actions = [
  {
    text: 'تعديل',
    icon:'pi pi-pencil',
    permission: 'roles:create',
    action: (val) => {
      details.value = val
      visible.value = true
    }
  },
  {
    text: 'مسح',
    icon:'pi pi-trash',
    permission: 'roles:soft_remove',
    action: (val) => window.showDeleteModal({
      title: 'منتج',
      id: val.id,
      url: 'admin/roles',
    })
  }
]

const status= {
  active:"نشط",
  deactive:"غير نشط"
}
const loadingTable = ref(false)
const details = ref({})
const visible = ref(false)
</script>
