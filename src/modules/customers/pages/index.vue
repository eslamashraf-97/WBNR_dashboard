<template>
  <Box class="p-5">
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">المسوقيين</h5>
    </div>

    <main-table :showActions="false" :list_url="'admin/customers'" :columns="columns">
      <template v-slot:status="{data}">
          <p class="status--deactive" v-if="!data.status"> {{ status['deactive'] }} </p>
          <p v-else :class="`status--${data.status}`"> {{ status[data.status] }} </p>
      </template>
      <template v-slot:active="{data}">
        <InputSwitch  v-if="$hasPer('countries:update')" v-model="data.status" true-value="active" @change="toggle(data.id, data.status)"/>
      </template>
    </main-table>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import InputSwitch from 'primevue/inputswitch';
import customerServices from "../services/customer.services";

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
  },
  {
    header: 'مفعل',
    field: 'active'
  }
]
const status= {
  active:"نشط",
  deactive:"غير نشط"
}

const details = ref({})
const visible = ref(true)
function toggle(id, status) {
  customerServices.switchStatus(id, status ? 'active' : 'deactive')
}
</script>
