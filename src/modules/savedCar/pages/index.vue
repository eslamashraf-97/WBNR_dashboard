<template>
  <Box class="p-5">
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">جميع الوثائق</h5>
      <app-button submit-title="إضف سياره جديدة" class="rounded-lg font-medium !py-3">
        <template v-slot:icon>
          +
        </template>
      </app-button>
    </div>
    <div class="grid xl:grid-cols-5 md:grid-cols-3 gap-4">
      <car-card />
      <car-card />
      <car-card />
      <car-card />
      <car-card />
    </div>
  </Box>
</template>

<script setup>
import AppButton from "@/components/global/AppButton.vue";
import CarCard from "../components/CarCard.vue"
</script>
