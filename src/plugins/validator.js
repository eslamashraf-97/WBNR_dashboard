import { Form, Field, ErrorMessage, FieldArray } from 'vee-validate';
import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules/dist/vee-validate-rules.js';
Object.keys(AllRules).forEach((rule) => {
	defineRule(rule, AllRules[rule]);
});
defineRule('required', (value) => {
	if (!value) {
		return 'This field is required';
	}
	return true;
});
defineRule('integer', (value) => {
	if (
		!isNaN(value) &&
		parseInt(Number(value)) == value &&
		!isNaN(parseInt(value, 10))
	) {
		return true;
	} else {
		return 'This field must be integer value';
	}
});

defineRule('min_value', (value, [limit]) => {
	// The field is empty so it should pass
	if (!value) {
		return true;
	}
	if (parseInt(value) < parseInt(limit)) {
		return `This field must be at least ${limit}`;
	}
	return true;
});
defineRule('max_value', (value, [limit]) => {
	// The field is empty so it should pass
	if (!value) {
		return true;
	}
	if (parseInt(value) > parseInt(limit)) {
		return `This field must be maximum ${limit}`;
	}
	return true;
});

defineRule('in', (value, limit) => {
	console.log(limit[0]);
	if (limit.length > 1) {
		if (!value) {
			return true;
		}
		if (
			Number(value) != Number(limit[0]) ||
			Number(value) != Number(limit[1])
		) {
			return `This field must be  ${limit[0]} or ${limit[1]}`;
		}
	}
	return true;
});

export default {
	install: (app) => {
		app
			.component('ValidationForm', Form)
			.component('FieldArray', FieldArray)
			.component('Field', Field)
			.component('ErrorMessage', ErrorMessage);
	},
};
