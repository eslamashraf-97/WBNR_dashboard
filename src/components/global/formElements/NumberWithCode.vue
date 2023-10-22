<template>
	<div class="flex w-full">
		<main-select
			class="grow-0 w-22 countryCode"
			:options="countries"
			optionLabel="name"
			placeholder="select name"
			v-model="selectedCountry"
			selectVal="id"
		>
			<template #value="value">
				{{ value }}
			</template>
			<template #options="option">
				<div>{{ option.option.code }} {{ option.option.code }}</div>
			</template>
		</main-select>
		<InputText
			v-model="phone"
			type="text"
			class="grow-2 countryCodeWithInput"
			placeholder="1234567"
			id="mobile-number"
			:useGrouping="false"
		/>
	</div>
</template>
<script setup>
import { ref } from 'vue';

const selectedCountry = ref('');
const phone = ref('');
const countries = ref([
	{
		id: 1,
		name: 'Saudi Arabia',
		flag: 'http://57.128.20.16:50013/placeholder_images/countries',
		code: '0900',
	},
]);
</script>
