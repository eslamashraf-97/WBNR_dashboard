<template>
  <Box>
    <div class="flex gap-2 items-center justify-center py-3 border-b-2">
      <img :src="image"/>
      <h4 class="text-base font-medium text-dark">{{ title }}</h4>
    </div>
    <slot>
      <div class="flex justify-around my-6">
        <div class="flex justify-between items-center flex-col">
          <h2 class="text-3xl text-emerald-500 font-medium">3</h2>
          <p class="text-sm m-0 text-gray-secondary">وثائق سارية</p>
        </div>
        <div class="flex justify-between items-center flex-col">
          <h2 class="text-3xl text-red-500 font-medium">2</h2>
          <p class="text-sm m-0 text-gray-secondary">وثيقة منتهية</p>
        </div>
        <div class="flex justify-between items-center flex-col">
          <h2 class="text-3xl text-primary font-medium">1</h2>
          <p class="text-sm m-0 text-gray-secondary">فاتورة سداد</p>
        </div>
      </div>
    </slot>
  </Box>
</template>

<script setup>
defineProps({
  image: {},
  title: {
    type: String
  }
})
</script>
