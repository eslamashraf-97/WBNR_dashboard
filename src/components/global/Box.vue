<template>
  <div :class="['bg-white rounded-lg w-full shadow-box p-2 px-4', classContent]" v-bind="$attrs">
      <slot></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  classContent: {
    type : String,
    default: ''
  }
})
</script>
