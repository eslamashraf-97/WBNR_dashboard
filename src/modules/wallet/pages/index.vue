<template>
  <Box class="p-5">
    <Dialog v-model:visible="showOrderDetail" maximizable  modal :header="'تفاصيل الطلب'" :style="{ width: '50vw' }">
      <p v-for="(i, key, ind) in details.withdraw_method_details" :key="ind" class="mb-4 text-end">
        {{key}} : {{i}}
      </p>
      <label class="mt-3 mb-2 text-gray-700 text-lg">اختر الحالة :</label>
      <div class="gap-4 grid grid-cols-4">
        <div :class="['col-span-1 overflow-hidden cursor-pointer']" @click="selected = item" v-for="(item, key) in status" :key="key">
          <div :class="['border w-full text-center py-3 rounded-md', {'bg-primary-200 text-primary-300': selected == item}]">{{ item }}</div>
        </div>
      </div>

      <div class="flex justify-center mt-5">
        <app-button submit-title="حفط التغييرات" :loading="loading" type="button" @click="changeStatus"/>
      </div>
    </Dialog>

    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">المحفظة</h5>
    </div>

    <main-table :showActions="false" :loading-table="loadingTable" :list_url="'admin/wallet/request/withdraw-requests'" :columns="columns">
      <template v-slot:changeStatus="{data}">
        <app-button class="border border-primary-300 !text-primary-300 !bg-white" submit-title="تفاصيل الطلب" @click="showOrderDetails(data)"/>
      </template>
      <template v-slot:status="{data}">
        <div class="flex items-center gap-2 py-2">
          <p :class="`status--${data.status}`">{{data.status}}</p>
        </div>
      </template>
    </main-table>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from "@/components/global/AppButton.vue";
import walletServices from "@modules/wallet/services/wallet.services";

const columns = [
  {
    header: 'عن طريق',
    field: 'wallet_request_method'
  },
  {
    header: 'نوع المعاملة',
    field: 'type'
  },
  {
    header: 'السعر',
    field: 'amount'
  },
  {
    header: 'حالة الطلب',
    field: 'status'
  },
  {
    header: '',
    field: 'changeStatus'
  }
]


const showOrderDetail = ref(false)
const details = ref()
const selected = ref()
const loading = ref(false)
const loadingTable = ref(false)

const status = ['pending', 'accepted',  'canceled', 'denied']

function showOrderDetails(data) {
  showOrderDetail.value = true
  details.value = data
  selected.value = data.status
}
function changeStatus () {
  loading.value = true
  loadingTable.value = false
  walletServices.changeStatus(details.value.id, {new_status: selected.value}).then(() => {
    showOrderDetail.value = false
    loadingTable.value = true
  }).finally(() => {
    loading.value = false
  })
}
</script>
