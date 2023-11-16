<template>
  <Box class="p-5">
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">البلاد</h5>
    </div>

    <main-table :showActions="false" :list_url="'admin/countries'" :columns="columns">
      <template v-slot:name="{data}">
        <div class="flex items-center gap-2 py-2">
          <img class="flag" :src="data.image">
          <p>{{data.name}}</p>
        </div>
      </template>
      <template v-slot:active="{data}">
        <InputSwitch v-model="data.status" true-value="active" @change="toggle(data.id)"/>
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
    header: 'العملة',
    field: 'currency'
  },
  {
    header: 'الضريبة %',
    field: 'taxPercentage'
  },
  {
    header: 'مفعل',
    field: 'active'
  }
]

const details = ref({})
const visible = ref(true)

function toggle(id) {
  console.log('id => ', id)
}
</script>
