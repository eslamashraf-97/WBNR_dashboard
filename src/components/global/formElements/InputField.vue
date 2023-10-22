<template>
  <!--			:modelValue="modelValue"-->
    <div class="form-group">
		<label :for="id" class="capitalize p-0 font-semibold font-14 text-text-700" v-if="label">{{
			label
		}}</label>
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
			<span class="p-input-icon-right flex-grow mt-2">
				<slot name="icon"></slot>
				<InputText
					@keyup="$emit('write', value)"
					class="border-4"
					:class="['w-full', { 'is-invalid': errors.length > 0 }]"
					:feedback="false"
					:placeholder="placeholder"
					:type="type"
					:id="name"
					:disabled="disabled"
					toggleMask
					@update:modelValue="handleChange"
					@blur="handleChange"
					v-bind="field"
				/>
			</span>
		</Field>
		<ErrorMessage :name="name" class="!text-red-500 text-xs mt-1" />
	</div>
</template>
<script>
export default {
	name: 'Input',
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
		modelValue: {
			default: '',
		},
		type: {
			type: String,
			default: 'text',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
