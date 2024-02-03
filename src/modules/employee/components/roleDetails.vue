<template>
  <ValidationForm @submit="onsubmit" 	v-slot="{ values }" :initialValues="details">
    <div class="ld:grid grid-cols-2 gap-2">
      <InputField type="text" validation="required" placeholder="الاسم باللغه العربية" name="name_ar"/>
      <InputField type="text" validation="required" placeholder="الاسم باللغه الانجليزية" name="name_en"/>
      <div v-for="(item, key) in permissions" :key="key">
        <Field v-slot="{ field }" name="permissions" type="checkbox" :value="item.id">
          <label class="flex gap-2">
            <div class="checkbox-wrapper-45">
              <input type="checkbox" name="terms" :id="item.id" v-bind="field" :value="item.id" />
              <label class="cbx" :for="item.id">
                <div class="flip">
                  <div class="front"></div>
                  <div class="back">
                    <svg width="14" height="12" viewBox="0 0 16 14">
                      <path d="M2 8.5L6 12.5L14 1.5"></path>
                    </svg>
                  </div>
                </div>
              </label>
            </div>
            {{ item.name_ar }}
          </label>
        </Field>
      </div>
      <MainTextarea class="col-span-2" name="description" plceholder="تفاصيل"></MainTextarea>
    </div>
    <div class="sign-up__button-action mt-4">
      <AppButton class="" type="submit" :loading="loading" submit-title="حفظ "></AppButton>
    </div>
  </ValidationForm>
</template>
<script setup>
import { ref } from 'vue'

import Checkbox from 'primevue/checkbox'
import MainTextarea from "@/components/global/formElements/MainTextarea.vue"
import employeeServices from "../services/employee.services"

import { useCountries } from "../../country/composables"
import {usePermissions} from "../composables/permissions"
const { permissions } = usePermissions()
const { countries } = useCountries()

const props = defineProps(['details'])
const emit = defineEmits(['finish'])


let loading = ref(false)

function onsubmit (values) {
  loading.value = true
  if (Object.keys(props.details).length !== 0) {
    employeeServices.editRole({...values}).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  } else {
    employeeServices.createRole({...values}).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  }
}

</script>

<style lang="scss">
.checkbox-wrapper-45 {
  position: relative;
}

.checkbox-wrapper-45 input[type="checkbox"] {
  display: none;
  visibility: hidden;
}
.checkbox-wrapper-45 .cbx {
  padding:0 !important;
  -webkit-perspective: 20;
  perspective: 20;
  display: inline-block;
  border: 2px solid #e8e8eb;
  background: #e8e8eb;
  border-radius: 4px;
  transform: translate3d(0, 0, 0);
  cursor: pointer;
  transition: all 0.3s ease;
}
.checkbox-wrapper-45 .cbx:hover {
  border-color: theme('colors.primary.300');
}
.checkbox-wrapper-45 .flip {
  display: block;
  transition: all 0.4s ease;
  transform-style: preserve-3d;
  position: relative;
  width: 15px;
  height: 15px;
}
.checkbox-wrapper-45 input[type="checkbox"]:checked + .cbx {
  border-color: theme('colors.primary.300');
}
.checkbox-wrapper-45 input[type="checkbox"]:checked + .cbx .flip {
  transform: rotateY(180deg);
}
.checkbox-wrapper-45 .front,
.checkbox-wrapper-45 .back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 15px;
  height: 15px;
  border-radius: 2px;
}
.checkbox-wrapper-45 .front {
  background: #fff;
  z-index: 1;
}
.checkbox-wrapper-45 .back {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateY(180deg);
  background: theme('colors.primary.300');
  text-align: center;
  color: #fff;
  line-height: 20px;
  box-shadow: 0 0 0 1px theme('colors.primary.300');
}
.checkbox-wrapper-45 .back svg {
  //margin-top: 3px;
  fill: none;
}
.checkbox-wrapper-45 .back svg path {
  stroke: #fff;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
