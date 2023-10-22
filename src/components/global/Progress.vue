<template>
	<section class="w-full mt-4">
		<p class="text-xs font-medium mb-1">
			<span class="text-lime-700">{{ value }}%</span>
			<span class="text">{{ label }} </span>
		</p>
		<ProgressBar class="bg-green-900" :showValue="false" :value="value" />
	</section>
</template>
<script setup>
const props = defineProps({
	value: {
		type: String,
	},
	label: {
		type: String,
	},
});
</script>
