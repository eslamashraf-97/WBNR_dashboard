<template>
	<button
		:class="[
			'bg-primary-300 rounded-lg text-white capitalize text-base py-2 min-w-[100px]',
			classContent,
			disabled ? `${disabledClass} cursor-not-allowed opacity-25` : '',
		]"
		:type="type"
		:disabled="disabled"
		:loading="loading"
    v-bind="$attrs"
	>
		<span v-if="loading">
			<ProgressSpinner  style="width: 20px; height: 20px"/>
		</span>
		<slot v-else >
			<span class="flex justify-center items-center gap-2  whitespace-nowrap"><slot name="icon"></slot>{{ submitTitle }}<slot name="iconLeft"></slot></span>
		</slot>
	</button>
</template>
<script>
import ProgressSpinner from 'primevue/progressspinner';
export default {
	props: {
		loading: {
			type: Boolean,
			default: false,
		},
		disabledClass: {
			type: String,
			default: 'bg-primary-200',
		},
		type: {
			type: String,
			default: 'button',
		},
		submitTitle: {
			type: String,
			default: '',
		},
		classContent: {
			type: String,
			default: 'px-4',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
  components:{
    ProgressSpinner
  }
};
</script>
<style></style>
