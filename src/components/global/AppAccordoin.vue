<template>
	<div>
		<button
			@click="toggleAccordion()"
			:class="[
				'flex items-center justify-between w-full px-3 py-2',
				isOpen ? 'bg-main-50' : '',
			]"
			:aria-expanded="isOpen"
			:aria-controls="`collapse${_uid}`"
		>
			<slot name="title" />
			<svg
				class="w-3 transition-all duration-200 transform"
				:class="{
					'rotate-180': isOpen,
					'rotate-0': !isOpen,
				}"
				fill="none"
				stroke="currentColor"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 10"
				aria-hidden="true"
			>
				<path
					d="M15 1.2l-7 7-7-7"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>

		<div v-show="isOpen" class="bg-main-50" :id="`collapse${_uid}`">
			<slot name="content" />
		</div>
	</div>
</template>

<script>
export default {
	props: ['activeClass'],
	data() {
		return {
			isOpen: false,
		};
	},

	methods: {
		toggleAccordion() {
			this.isOpen = !this.isOpen;
		},
	},
};
</script>
