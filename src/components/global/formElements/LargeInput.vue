<template>
	<div>
		<Field
			:name="name"
			:rules="validation"
			validate-on-input
			validate-on-change
			validate-on-model-update
			validate-on-blur
			v-slot="{ handleChange, value, errors, field }"
			@input="$emit('update:modelValue', $event.target.value)"
			:modelValue="modelValue"
		>
			<div
				:class="['form__group field', { 'active--input': active }]"
				v-bind="$attrs"
			>
				<input
					@focus="active = true"
					@blur="active = false"
					:type="type"
					:class="['form__field', { 'is-invalid': errors.length > 0 }]"
					placeholder=" "
					:name="name"
					:id="name"
					@input="$emit('update:modelValue', $event.target.value)"
					:modelValue="modelValue"
					required
				/>
				<label
					:for="name"
					:class="[
						'form__label active-input',
						{ 'active-input-class': modelValue.length },
					]"
					>{{ label }}</label
				>
			</div>
		</Field>
		<ErrorMessage :name="name" class="text-error-500 text-xs mt-1 mb-1" />
	</div>
</template>

<script setup>
import { ref } from 'vue';

const active = ref(false);
const props = defineProps({
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
});
</script>
<style lang="scss">
.active--input {
	border-width: 1px;
	//border-color: theme('colors.dark.500');
	transition: border-color 0.2s;
	.form__label {
		font-size: 0.8rem !important;
	}
}
.active-input-class {
	font-size: 0.8rem !important;
}
.form__group {
	position: relative;
	padding: 19px 0 0;
	border-width: 1.25px;
	padding-inline-start: 10px;
	@apply h-[64px]
}
.form__field {
	font-family: inherit;
	width: 100%;
	border: 0;
	outline: 0;
	font-size: 1rem;
	//color: theme('colors.dark.400');
	padding: 7px 0;
	background: transparent;

	&::placeholder {
		color: transparent;
	}

	&:placeholder-shown ~ .form__label {
		font-size: 1rem;
		cursor: text;
		top: 20px;
		//color: theme('colors.text.200');
	}
}

.form__label {
	position: absolute;
	top: 0;
	display: block;
	transition: 0.2s;
	font-size: 1rem;
	//color: theme('colors.text.200');
	font-weight: 200;
	line-height: 24px;
}

.form__field:focus {
	~ .form__label {
		position: absolute;
		top: 0;
		display: block;
		transition: 0.2s;
		font-size: 1rem;
	}
}

.form__field {
	&:required,
	&:invalid {
		box-shadow: none;
	}
}
</style>
