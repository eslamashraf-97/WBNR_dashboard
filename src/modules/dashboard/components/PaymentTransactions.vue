<template>
  <Box>
    <div class="p-3">
      <div class="mb-5 border-b border-dashed border-gray-secondary pb-4">
        <h4 class="text-base font-medium text-dark mb-6">المدفوعات السابقه</h4>
        <payment-card />
        <payment-card />
        <payment-card />
      </div>
      <div>
        <div class="flex justify-between mb-6 pt-2">
          <h4 class="text-base font-medium text-dark">سجل المدفوعات</h4>
          <span class="text-primary text-sm cursor-pointer">رؤية المزيد</span>
        </div>
        <payment-card>
          <template v-slot:image>
            <img src="@/assets/images/dashboard/icon.png" />
          </template>
          <template v-slot:left>
            <p class="font-bold text-lg text-red-500">$345</p>
          </template>
        </payment-card>
        <payment-card>
          <template v-slot:image>
            <img src="@/assets/images/dashboard/icon.png" />
          </template>
          <template v-slot:left>
            <p class="font-bold text-lg text-red-500">$345</p>
          </template>
        </payment-card>
        <payment-card>
          <template v-slot:image>
            <img src="@/assets/images/dashboard/icon.png" />
          </template>
          <template v-slot:left>
            <p class="font-bold text-lg text-red-500">$345</p>
          </template>
        </payment-card>
      </div>
    </div>
  </Box>
</template>
<script setup>
import PaymentCard from "@/components/global/cards/paymentCard.vue";
</script>
