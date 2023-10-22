<template>
  <Box class="p-5">
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">العملاء</h5>
    </div>

    <main-table :showActions="false" :list_url="'admin/customers'" :columns="columns">
      <template v-slot:status="{data}">
          <p :class="`status--${data.status}`"> {{ status[data.status] }} </p>
      </template>
    </main-table>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import InputSwitch from 'primevue/inputswitch';

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
const status= {
  active:"نشط",
  deactive:"غير نشط"
}

const details = ref({})
const visible = ref(true)
</script>
