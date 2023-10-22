<template>
  <Box class="p-5">
    <Dialog v-model:visible="visible" maximizable  modal :header="'إضافة موظف'" :style="{ width: '50vw' }">
      <employeeDetails @finish="loadingTable = true; visible = false" :details="details"/>
    </Dialog>
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">الموظفيين</h5>
      <app-button submit-title="إضف موظف" class="rounded-lg font-medium !py-3" @click="visible = true">
        <template v-slot:icon>
          +
        </template>
      </app-button>
    </div>

    <main-table actionDots  :loadingTable="loadingTable" :actions="actions" :list_url="'admin/users'" :columns="columns">
      <template v-slot:status="{data}">
          <p :class="`status--${data.status}`"> {{ status[data.status] }} </p>
      </template>
    </main-table>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import employeeDetails from '../components/employeeDetails.vue'

const columns = [
  {
    header: 'الاسم',
    field: 'name'
  },
  {
    header: 'البريد الالكترونى',
    field: 'email'
  },
  {
    header: 'رقم الهاتف',
    field: 'phone'
  },
  {
    header: 'كود الدولة',
    field: 'country_code'
  },
  {
    header: 'العنوان',
    field: 'address'
  },
  {
    header: 'الحالة',
    field: 'status'
  }
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
      title: 'منتج',
      id: val.id,
      url: 'admin/users',
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
