<template>

  <div class="border" v-for="index in numberOfItem">
    <div class="bg-secondary-200 text-text-700 font-semibold p-3 py-4 mb-2">
      <Skeleton width="100%"></Skeleton>
    </div>
    <div class="p-2">
      <div class="mb-4">
        <label class="font-semibold text-sm mb-2"> <Skeleton width="40%"></Skeleton></label>
        <div class="flex justify-between mt-3">
          <Skeleton width="6rem" height="2rem"></Skeleton>
          <Skeleton width="6rem" height="2rem"></Skeleton>
          <Skeleton width="6rem" height="2rem"></Skeleton>
        </div>
      </div>
      <div class="mb-4">
        <label class="font-semibold text-sm mb-2"><Skeleton width="40%"></Skeleton></label>
        <div class="flex justify-between mt-3">
          <Skeleton width="6rem" height="2rem"></Skeleton>
          <Skeleton width="6rem" height="2rem"></Skeleton>
          <Skeleton width="6rem" height="2rem"></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
defineProps({
	numberOfItem: {
		default: 4,
	},
});
</script>
