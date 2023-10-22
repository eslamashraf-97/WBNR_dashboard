<template>
	<div>
		<div class="shadow-none">
			<div class="mt-4 flex flex-wrap gap-4">
				<div
					v-for="(item, key) in lists"
					:key="key"
					@click="appendToData(keyOfSelect ? item[keyOfSelect] : item)"
				>
					<div
						:class="[
							checkSelected(keyOfSelect ? item[keyOfSelect] : item)
								? 'border-transparent'
								: 'border-gray-300',
							checkSelected(keyOfSelect ? item[keyOfSelect] : item)
								? 'border-text-500 ring-text-500'
								: '',
							`relative flex cursor-pointer rounded-lg border bg-white items-center p-1  gap-2 p-2 w-40 h-[44px] ${classContent}`,
						]"
					>
						<div
							v-if="showIcon"
							:class="[
								checkSelected(keyOfSelect ? item[keyOfSelect] : item)
									? 'bg-white-600 border-text-500'
									: ' border-gray-500',
								checkSelected(keyOfSelect ? item[keyOfSelect] : item)
									? 'ring-2 ring-offset-2 ring-transparent'
									: '',
								'h-4 w-4 cursor-pointer border flex-center',
								errors.length > 0 ? 'border-error-500' : '',
							]"
							aria-hidden="true"
						>
							<div
								class="bg-white bg-text-500 w-2 h-2"
								v-if="checkSelected(keyOfSelect ? item[keyOfSelect] : item)"
							/>
						</div>
						<slot
							:details="keyOfSelect ? item[keyOfSelect] : item"
							:checked="checkSelected(keyOfSelect ? item[keyOfSelect] : item)"
						></slot>
						<span
							:class="[
								checkSelected(keyOfSelect ? item[keyOfSelect] : item)
									? 'border'
									: 'border-2',
								checkSelected(keyOfSelect ? item[keyOfSelect] : item)
									? 'border-text-500'
									: 'border-transparent',
								'pointer-events-none absolute -inset-px rounded-lg border-2',
							]"
							aria-hidden="true"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { reactive } from 'vue';
import { log10 } from 'chart.js/helpers';
const emit = defineEmits(['change']);
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
	errors: {},
	selected: {},
});

const selectedMailingLists = reactive({ data: [] });
if (props.selected) {
	selectedMailingLists.data.push(...props.selected);
}
function appendToData(data) {
	if (selectedMailingLists.data.indexOf(data) > -1) {
		selectedMailingLists.data.splice(
			selectedMailingLists.data.indexOf(data),
			1
		);
	} else {
		selectedMailingLists.data.push(data);
	}
	emit('change', selectedMailingLists.data);
}
function checkSelected(data) {
	return selectedMailingLists.data.indexOf(data) > -1;
}
</script>
