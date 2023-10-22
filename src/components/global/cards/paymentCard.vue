<script setup>

</script>

<template>
  <div class="flex justify-between items-center py-3">
    <div class="flex items-center gap-3">
      <slot name="image">
        <img src="@/assets/images/dashboard/car-insurance-document.svg"/>
      </slot>
      <div>
        <p class="text-sm font-medium text-dark">وثيقة تأمين سيارة [ ب ن ٢٣٤٥ ] </p>
        <p class="text-gray-secondary text-xs">12بريل ، 08:00 م</p>
      </div>
    </div>
    <slot name="left">
      <app-button submit-title="إدفع الأن" class="!p-1 bg-transparent !text-primary border-2 border-primary rounded-lg font-bold"/>
    </slot>
  </div>
</template>

<style scoped>

</style>
