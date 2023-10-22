<template>
  <Box class-content="h-full">
    <div class="h-full flex flex-col justify-center items-center gap-4">
      <img :src="image" />
      <p class="text-dark text-xl">{{ title }}</p>
    </div>
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

<style scoped>

</style>
