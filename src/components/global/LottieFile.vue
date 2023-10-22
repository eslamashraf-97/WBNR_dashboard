<template>
	<div>
		<Vue3Lottie :animationData="json || empty" :height="400" :width="400" />
		<p class="text-center text-xl text-text-500">You Don't Have Any Data</p>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
import empty from '@/assets/lottie/empty.json';
defineProps({
	json: { default: empty },
});
</script>

<style scoped></style>
