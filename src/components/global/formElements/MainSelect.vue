<template>
<!--  :modelValue="modelValue"-->
	<div class="form-group">
		<label :for="id" class="mb-sm capitalize p-0 mb-3" v-if="label">{{ label }}</label>
		<Field
				:name="name"
				:rules="validation"
				validate-on-input
				validate-on-change
				validate-on-model-update
				validate-on-blur
				v-slot="{ handleChange, value, errors, field }"
				@input="$emit('update:modelValue', $event.target.value)"
		>
			<Dropdown
				:class="['w-full', { 'is-invalid': errors.length > 0 }]"
				:options="options"
				:optionLabel="optionLabel"
				:optionValue="optionValue"
				:inputClass="`max-w-full capitalize h-[47px] ${inputClass}`"
				:placeholder="placeholder"
				:id="id"
				:modelValue="value"
				@change="$emit('update:modelValue', $event.value)"
				@update:modelValue="handleChange"
				v-bind="field.value?.value"
			>
				<template #value="slotProps">
					<slot name="value" :slotProps="slotProps"/>
				</template>
				<template #option="slotProps">
					<slot name="option" :slotProps="slotProps"/>
				</template>
				<template #indicator>
					<slot name="indicator"/>
				</template>
			</Dropdown>
		</Field>
		<ErrorMessage :name="name" class="text-error-500 text-xs mt-1" />
	</div>
</template>
<script>
export default {
	name: 'mainSelect',
	props: {
		name: {
			type: String,
		},
		id: {
			type: String,
		},
		validation: {
			type: String,
		},
		label: {
			type: String,
		},
		placeholder: {
			type: String,
		},
		type: {
			type: String,
			default: 'text',
		},
		error: {
			type: [String, Array],
			default: '',
		},
		options: {
			type: Array,
			default: [],
		},
		optionLabel: {
			type: String,
			default: '',
		},
		optionValue: {
			type: String,
			default: '',
		},
		inputClass: {
			type: String,
			default: '',
		},
		modelValue: {
			default: '',
		},
	},
};
</script>
