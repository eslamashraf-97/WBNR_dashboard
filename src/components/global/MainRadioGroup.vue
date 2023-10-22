<template>
	<RadioGroup :modelValue="selectedMailingLists" class="shadow-none">
		<div class="mt-4 flex flex-wrap gap-4">
			<RadioGroupOption
				as="template"
				v-for="(item, key) in lists"
				:key="key"
				:value="keyOfSelect ? item[keyOfSelect] : item"
				v-slot="{ checked, active }"
			>
				<div
					:class="[
						checked ? 'border-transparent' : 'border-gray-300',
						active ? 'border-text-500 ring-text-500' : '',
						`relative flex cursor-pointer rounded-lg border bg-white items-center p-1  gap-2 p-2 w-40 h-[44px] ${classContent}`,
					]"
				>
					<div
						v-if="showIcon"
						:class="[
							checked ? 'bg-white-600 border-text-500' : ' border-gray-500',
							active ? 'ring-2 ring-offset-2 ring-transparent' : '',
							'h-4 w-4 cursor-pointer rounded-full border flex-center',
						]"
						aria-hidden="true"
					>
						<div
							class="rounded-full bg-white bg-text-500 w-2 h-2"
							v-if="checked"
						/>
					</div>
					<slot :details="item" :checked="checked"></slot>
					<span
						:class="[
							active ? 'border' : 'border-2',
							checked ? 'border-text-500' : 'border-transparent',
							'pointer-events-none absolute -inset-px rounded-lg border-2',
							errors.length > 0 ? 'border-error-500' : '',
						]"
						aria-hidden="true"
					/>
				</div>
			</RadioGroupOption>
		</div>
	</RadioGroup>
</template>

<script setup>
import { ref } from 'vue';
import { RadioGroup, RadioGroupOption } from '@headlessui/vue';
const props = defineProps({
	lists: {
		default: [],
	},
	titleOfGroup: {
		type: String,
		default: 'Choose Payment Methods',
	},
	keyOfSelect: {
		type: String,
	},
	multi: {
		type: Boolean,
		default: false,
	},
	showIcon: {
		type: Boolean,
		default: true,
	},
	classContent: {
		type: String,
		default: '',
	},
	errors: {
		default: [],
	},
});

const selectedMailingLists = ref();
</script>
