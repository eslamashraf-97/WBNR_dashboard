<template>
  <div class="grid  md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-4" v-if="stats">
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
        <p class="text-2xl mb-2">مبيعات</p>
        <h3 class="mb-0">{{ stats.sales }}</h3>
      </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4" @click="$router.push({name: 'products'})">
      <p class="text-2xl mb-2">عدد المنتجات</p>
      <h3 class="mb-0">{{ stats.total_products }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4" @click="$router.push({name: 'orders'})">
      <p class="text-2xl mb-2">عدد الطلبات</p>
      <h3 class="mb-0">{{ stats.total_orders }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4" @click="$router.push({name: 'customers'})">
      <p class="text-2xl mb-2">عدد البائعيين</p>
      <h3 class="mb-0">{{ stats.total_customers }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4"  @click="$router.push({name: 'orders', query: {status: 'pending'} })">
      <p class="text-2xl mb-2">عدد الطلبات المعلقة</p>
      <h3 class="mb-0">{{ stats.pending_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4" @click="$router.push({name: 'orders', query: {status: 'processing_order_count'} })">
      <p class="text-2xl mb-2">عدد الطلبات جارى تحضيرها</p>
      <h3 class="mb-0">{{ stats.processing_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4"  @click="$router.push({name: 'returnedOrder'})">
      <p class="text-2xl mb-2">عدد الطلبات الملغية</p>
      <h3 class="mb-0">{{ stats.cancelled_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4" @click="$router.push({name: 'orders', query: {status: 'confirmed'} })">
      <p class="text-2xl mb-2">عدد الطلبات المستلمة</p>
      <h3 class="mb-0">{{ stats.confirmed_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4" @click="$router.push({name: 'orders', query: {status: 'confirmed'} })">
      <p class="text-2xl mb-2">عدد الطلبات التى تم الموافقة عليها</p>
      <h3 class="mb-0">{{ stats.confirmed_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4" @click="$router.push({name: 'orders', query: {status: 'shipping'} })">
      <p class="text-2xl mb-2">عدد طلبات الشحن</p>
      <h3 class="mb-0">{{ stats.shipping_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4" @click="$router.push({name: 'orders', query: {status: 'rejected'} })">
      <p class="text-2xl mb-2">عدد الطلبات المرفوضة</p>
      <h3 class="mb-0">{{ stats.rejected_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4" @click="$router.push({name: 'orders', query: {status: 'delivered'} })">
      <p class="text-2xl mb-2">عدد الطلبات التي تم تسليمها</p>
      <h3 class="mb-0">{{ stats.delivered_order_count }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dashboardServices from "@modules/dashboard/services/dashboard.services";
const stats = ref('')
function getAllStats() {
  dashboardServices.getAllStatistics().then(res => {
    stats.value = res.data.data
  })
}

if(localStorage.getItem('permissions')) {
  if(JSON.parse(localStorage.getItem('permissions')).indexOf('dashboard-statistics:find') > -1) {getAllStats()}
}
</script>
