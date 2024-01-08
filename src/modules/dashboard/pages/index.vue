<template>
  <div>
    <Dropdown
      :class="'max-w-full capitalize h-[47px] mb-4'"
      :options="countries"
      v-model="details"
      placeholder="اختر الدوله"
      optionLabel="name"
      optionValue="id"
      @change="getAllStats"
    >
    </Dropdown>
  </div>
  <div class="grid  md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4" v-if="stats">
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer">
        <p class="text-2xl mb-2">مبيعات</p>
        <h3 class="mb-0">{{ stats.sales }}</h3>
      </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'products'})">
      <p class="text-2xl mb-2">عدد المنتجات</p>
      <h3 class="mb-0">{{ stats.total_products }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'orders'})">
      <p class="text-2xl mb-2">عدد الطلبات</p>
      <h3 class="mb-0">{{ stats.total_orders }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'customers'})">
      <p class="text-2xl mb-2">عدد البائعيين</p>
      <h3 class="mb-0">{{ stats.total_customers }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer"  @click="$router.push({name: 'orders', query: {status: 'pending'} })">
      <p class="text-2xl mb-2">عدد الطلبات المعلقة</p>
      <h3 class="mb-0">{{ stats.pending_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'orders', query: {status: 'processing_order_count'} })">
      <p class="text-2xl mb-2">عدد الطلبات جارى تحضيرها</p>
      <h3 class="mb-0">{{ stats.processing_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer"  @click="$router.push({name: 'returnedOrder'})">
      <p class="text-2xl mb-2">عدد الطلبات الملغية</p>
      <h3 class="mb-0">{{ stats.cancelled_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'orders', query: {status: 'confirmed'} })">
      <p class="text-2xl mb-2">عدد الطلبات المستلمة</p>
      <h3 class="mb-0">{{ stats.confirmed_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'orders', query: {status: 'confirmed'} })">
      <p class="text-2xl mb-2">عدد الطلبات التى تم الموافقة عليها</p>
      <h3 class="mb-0">{{ stats.confirmed_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'orders', query: {status: 'shipping'} })">
      <p class="text-2xl mb-2">عدد طلبات الشحن</p>
      <h3 class="mb-0">{{ stats.shipping_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'orders', query: {status: 'rejected'} })">
      <p class="text-2xl mb-2">عدد الطلبات المرفوضة</p>
      <h3 class="mb-0">{{ stats.rejected_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'orders', query: {status: 'delivered'} })">
      <p class="text-2xl mb-2">عدد الطلبات التي تم تسليمها</p>
      <h3 class="mb-0">{{ stats.delivered_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'orders', query: {status: 'delivered'} })">
      <p class="text-2xl mb-2">ايرادات العملاء</p>
      <h3 class="mb-0">{{ stats.customers_confirmed_revenue }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'orders', query: {status: 'delivered'} })">
      <p class="text-2xl mb-2">إجمالي المبلغ المتبقي</p>
      <h3 class="mb-0">{{ stats.total_remaining_amount }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'orders', query: {status: 'delivered'} })">
      <p class="text-2xl mb-2">إجمالي المبلغ الذي تم إنفاقه</p>
      <h3 class="mb-0">{{ stats.total_sent_amount }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4 cursor-pointer" @click="$router.push({name: 'orders', query: {status: 'delivered'} })">
      <p class="text-2xl mb-2">إجمالي المبلغ الذي تم سحبه</p>
      <h3 class="mb-0">{{ stats.total_withdraw_amount }}</h3>
    </div>
  </div>
</template>

<script setup>
import MainSelect from "@/components/global/formElements/MainSelect.vue"
import dashboardServices from "@modules/dashboard/services/dashboard.services"
import { useCountries } from "../../country/composables"
import { ref } from 'vue'
const stats = ref('')
const { countries } = useCountries()
const details = ref()
function getAllStats(data = '') {
  // console.log('data => ', data?.value);
  dashboardServices.getAllStatistics(data?.value).then(res => {
    stats.value = res.data.data
    details.value = +res.data.data.country_id
  })
}

if(localStorage.getItem('permissions')) {
  if(JSON.parse(localStorage.getItem('permissions')).indexOf('dashboard-statistics:find') > -1) {getAllStats()}
}
</script>
