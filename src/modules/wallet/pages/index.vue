<template>
  <Box class="p-5">
    <Dialog v-model:visible="showOrderDetail" maximizable  modal :header="'تفاصيل الطلب'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <p v-for="(i, key, ind) in details.withdraw_method_details" :key="ind" class="mb-4 text-end">
        {{key}} : {{i}}
      </p>
      <label class="mt-3 mb-2 text-gray-700 text-lg">اختر الحالة :</label>
      <div class="gap-4 grid grid-cols-4">
        <div :class="['col-span-1 overflow-hidden cursor-pointer']" @click="selected = item" v-for="(item, key) in status" :key="key">
          <div :class="['border w-full text-center py-3 rounded-md', {'bg-primary-200 text-primary-300': selected == item}]">{{ status_text[item] }}</div>
        </div>
      </div>
      <textarea v-model="reason" class="w-full mt-4" placeholder="ملحوظة"></textarea>
      <Upload name="invoice_path" label="ارفع الفاتوره" @upload="uploadImage"  :imageValue="featured_image"/>
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
      <template v-slot:customer="{data}">
        {{data?.customer?.name}}
      </template>
      <template v-slot:status="{data}">
        <div class="flex items-center gap-2 py-2">
          <p :class="`status--${data.status}`">{{status_text[data.status]}}</p>
        </div>
      </template>
    </main-table>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from "@/components/global/AppButton.vue";
import walletServices from "@modules/wallet/services/wallet.services";
import Upload from "@/components/global/formElements/Upload.vue"

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
    header: 'العميل',
    field: 'customer'
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
const reason = ref()
const selected = ref()
const loading = ref(false)
const loadingTable = ref(false)
const status = ref(["pending", "denied", "accepted", "canceled"])
const status_text = ref({
  pending: 'قيد الانتظار',
  denied: 'مرفوضة',
  accepted: "مقبولة",
  canceled: 'ملغية',
})
const invoice_path = ref()
const invoice_path_url = ref()
function uploadImage (val) {
  invoice_path.value = val
}
function showOrderDetails(data) {
  showOrderDetail.value = true
  details.value = data
  selected.value = data.status
  invoice_path_url.value = data.invoice_path
}
function changeStatus () {
  loading.value = true
  loadingTable.value = false
  walletServices.changeStatus(details.value.id, {new_status: selected.value, invoice_path: invoice_path.value, reason: reason.value}).then(() => {
    showOrderDetail.value = false
    loadingTable.value = true
  }).finally(() => {
    loading.value = false
  })
}
</script>
