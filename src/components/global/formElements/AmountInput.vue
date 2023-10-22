<template>
    <div class="form-group">
        <label for="id" class="mb-3 capitalize p-0 text-secondrt text-lg">Add Amount</label>
        <div class="amount-input flex items-center border-none">
            <large-input class="w-full h-[64px]" validation="required" label="Transfer Amount" name="amount" :modelValue="amount"   @update:modelValue="$emit('update:amount', $event)"/>
            <main-select :options="allOptions" :name="'currency'" :modelValue="selected"   @update:modelValue="$emit('update:selected', $event)">
                <template #value="slot">
                    <div class="flex items-center gap-1">
                        <div
                            class="rounded-full h-8 w-8"
                            :class="`mr-2 flag`"
                            :style="{ 'background-image': 'url(' + `/src/assets/images/flags/${slot.slotProps.value.logo}` + ')' }"
                        >
                        </div>
                        {{ slot.slotProps.value.code }}
                    </div>
                </template>
                <template #option="slot">
                    <div class="flex items-center">
                        <div
                            class="rounded-full h-8 w-8 mr-2 flag"
                            :class="`flag-${slot.slotProps.option.code}`"
                            :style="{ 'background-image': 'url(' + `/src/assets/images/flags/${slot.slotProps.option.logo}` + ')' }"
                        >
                        </div>
                        <div class="flex flex-col">
                            <span class="text-bold">{{ slot.slotProps.option.code }}</span>
                        </div>
                    </div>
                </template>
                <template #indicator>
                    <img src="@/assets/icons/dropDownArrow.svg" />
                </template>
            </main-select>
        </div>
    </div>
</template>

<script setup>

import mainSelect from "@/components/global/formElements/MainSelect.vue";
import LargeInput from "@/components/global/formElements/LargeInput.vue";

defineEmits(['update:amount', 'update:selectedCity'])

const props = defineProps({
    amount: {
        default: '',
    },
    selected: {
        default: ''
    },
    allOptions: {
        default: []
    }
})

function importImage(image) {
    return new URL(`/src/assets/images/flags/${image}`, import.meta.url).href
}

</script>

<style>
.amount-input .form-group .p-dropdown{
    border: 0 !important;
    height: 64px !important;
    background: theme('colors.secondary.300') !important;
}
</style>
