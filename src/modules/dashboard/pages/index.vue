<template>
  <div class="grid grid-cols-4 gap-4">
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
      <p class="text-2xl mb-2">مبيعات</p>
      <h3 class="mb-0">{{ stats.sales }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
      <p class="text-2xl mb-2">عدد المنتجات</p>
      <h3 class="mb-0">{{ stats.total_products }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
      <p class="text-2xl mb-2">عدد الطلبات</p>
      <h3 class="mb-0">{{ stats.total_orders }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
      <p class="text-2xl mb-2">عدد البائعيين</p>
      <h3 class="mb-0">{{ stats.total_customers }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
      <p class="text-2xl mb-2">عدد الطلبات المعلقة</p>
      <h3 class="mb-0">{{ stats.pending_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
      <p class="text-2xl mb-2">عدد الطلبات جارى تحضيرها</p>
      <h3 class="mb-0">{{ stats.processing_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
      <p class="text-2xl mb-2">عدد الطلبات الملغية</p>
      <h3 class="mb-0">{{ stats.cancelled_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
      <p class="text-2xl mb-2">عدد الطلبات المستلمة</p>
      <h3 class="mb-0">{{ stats.confirmed_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
      <p class="text-2xl mb-2">عدد الطلبات التى تم الموافقة عليها</p>
      <h3 class="mb-0">{{ stats.confirmed_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
      <p class="text-2xl mb-2">عدد طلبات الشحن</p>
      <h3 class="mb-0">{{ stats.shipping_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
      <p class="text-2xl mb-2">عدد الطلبات المرفوضة</p>
      <h3 class="mb-0">{{ stats.rejected_order_count }}</h3>
    </div>
    <div class="flex flex-col bg-gray-100 border border-primary-300 rounded p-4">
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
getAllStats()
</script>
