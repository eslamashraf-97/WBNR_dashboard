<template>
  <Box class="p-5">
    <Dialog v-model:visible="showClientDetails" maximizable  modal :header="'تفاصيل العميل'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="mb-4">
        <span class="inline-block w-[120px] text-gray-500">اسم :</span>
        <span>{{ clientDetails.name }}</span>
      </div>
      <div class="mb-4">
        <span class="inline-block w-[120px] text-gray-500">رقم الهاتف :</span>
        <span>{{ clientDetails.phone }} - {{ clientDetails.secondary_phone }}</span>
      </div>
      <div class="mb-4">
        <span class="inline-block w-[120px] text-gray-500">العنوان :</span>
        <span>{{ clientDetails.address_details }}</span>
      </div>
      <div class="mb-4">
        <span class="inline-block w-[120px] text-gray-500">المتجر :</span>
        <span>{{ clientDetails.store_name }}</span>
      </div>
      <div>
        <span class="inline-block w-[120px] text-gray-500">ملحوظه :</span>
        <span>{{ clientDetails.notes }}</span>
      </div>
    </Dialog>
    <Dialog v-model:visible="showOrderDetail" maximizable  modal :header="'تفاصيل الطلب'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <main-table :show-actions="false" :loading-table="loadingTable" :list_data="orderDetails.orderItems" :columns="columnsProducts">
        <template v-slot:product="{data}">
          <div class="flex items-center gap-2 py-2">
            <Avatar :image="data.product.featured_image" size="large" shape="circle" />
            {{data.product.title}}
          </div>
        </template>
        <template v-slot:code="{data}">
          <p>{{data.product.code}}</p>
        </template>
      </main-table>
      <label class="mt-3 mb-2 text-gray-700 text-lg">اختر الحالة :</label>
      <div class="gap-4 grid grid-cols-4">
        <div :class="['col-span-1 overflow-hidden cursor-pointer']" @click="selected = item" v-for="(item, key) in status" :key="key">
          <div :class="['border w-full text-center py-3 rounded-md', {'bg-primary-200 text-primary-300': selected == item}]">{{ status_text[item] }}</div>
        </div>
      </div>
      <textarea v-model="reason" class="w-full mt-4" placeholder="ملحوظة"></textarea>
      <div class="flex justify-center mt-5">
        <app-button submit-title="حفط التغييرات" :loading="loading" type="button" @click="changeStatus"/>
      </div>
    </Dialog>

    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">الطلبات</h5>
    </div>
    <main-table :filters="$route.query" :showActions="false" :loading-table="loadingTable" :list_url="'admin/orders'" :columns="columns">
      <template v-slot:orderItems="{data}">
        <p>{{data.orderItems.length}}</p>
      </template>
      <template v-slot:country="{data}">
        <div class="flex items-center gap-2 py-2">
          <img class="flag" :src="data.country.image">
          <p>{{data.country.name}}</p>
        </div>
      </template>
      <template v-slot:price="{data}">
        <div class="flex items-center gap-2 py-2">
          <p>{{data.price}}</p>
          <span>{{data.country.currency}}</span>
        </div>
      </template>
      <template v-slot:tax_amount="{data}">
        <div class="flex items-center gap-2 py-2">
          <p>{{data.tax_amount}}</p>
          <span>{{data.country.currency}}</span>
        </div>
      </template>
      <template v-slot:delivery_cost="{data}">
        <div class="flex items-center gap-2 py-2">
          <p>{{data.delivery_cost}}</p>
          <span>{{data.country.currency}}</span>
        </div>
      </template>
      <template v-slot:final_price="{data}">
        <div class="flex items-center gap-2 py-2">
          <p>{{data.final_price}}</p>
          <span>{{data.country.currency}}</span>
        </div>
      </template>
      <template v-slot:client="{data}">
        <div class="flex items-center gap-2 py-2">
          <p>{{data.client.name}}</p>
          <span class="text-green-500 cursor-pointer" @click="showDetails(data.client)">(تفاصيل)</span>
        </div>
      </template>
      <template v-slot:status="{data}">
        <div class="flex items-center gap-2 py-2">
          <p :class="`status--${data.status}`">{{status_text[data.status]}}</p>
        </div>
      </template>
      <template v-slot:changeStatus="{data}">
        <app-button class="border border-primary-300 !text-primary-300 !bg-white" v-if="$hasPer('orders:update')" submit-title="تفاصيل الطلب" @click="showOrderDetails(data)"/>
      </template>
    </main-table>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from "@/components/global/AppButton.vue";
import Avatar from "primevue/avatar";
import orderServices from "@modules/orders/services/order.services";

const columns = [
  {
    header: 'رقم الطلب',
    field: 'order_number'
  },
  {
    header: 'العميل',
    field: 'client'
  },
  {
    header: 'البلد',
    field: 'country'
  },
  {
    header: 'عدد المنتجات',
    field: 'orderItems'
  },
  {
    header: 'السعر',
    field: 'price'
  },
  {
    header: 'قيمة الضريبة',
    field: 'tax_amount'
  },
  {
    header: 'سعر الشحن',
    field: 'delivery_cost'
  },
  {
    header: 'السعر النهائى',
    field: 'final_price'
  },
  {
    header: 'حالة الأوردر',
    field: 'status'
  },
  {
    header: '',
    field: 'changeStatus'
  }
]
const columnsProducts = [
  {
    header: 'كود المنتج',
    field: 'code'
  },
  {
    header: 'اسم المنتج',
    field: 'product'
  },
  {
    header: 'السعر النهائى',
    field: 'final_price'
  },
  {
    header: 'العدد',
    field: 'quantity'
  }
]

const showClientDetails = ref(false)
const showOrderDetail = ref(false)
const clientDetails = ref({})
const orderDetails = ref({})
const selected = ref()
const loading = ref(false)
const reason = ref('')
const loadingTable = ref(false)

const status = ['pending', 'confirmed',  'processing', 'cancelled', 'shipping', 'rejected', 'delivered']
const status_text = ref({
  pending: 'قيد الانتظار',
  confirmed: 'تأكيد',
  processing: 'جارة التجهيز ',
  cancelled: 'مرفوض',
  shipping: 'جارى التوصيل',
  rejected: 'مرفوض',
  delivered: 'تم الاستلام'
})
function showDetails(data) {
  showClientDetails.value = true
  clientDetails.value = data
}
function showOrderDetails(data) {
  showOrderDetail.value = true
  orderDetails.value = data
  selected.value = data.status
}
function changeStatus () {
  loading.value = true
  loadingTable.value = false
  orderServices.changeStatus(orderDetails.value.id, {status: selected.value, reason: reason.value}).then(() => {
    showOrderDetail.value = false
    loadingTable.value = true
  }).finally(() => {
    loading.value = false
  })
}
</script>
