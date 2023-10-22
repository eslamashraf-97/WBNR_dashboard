<template>
  <ValidationForm @submit="onsubmit" 	v-slot="{ values }" :initialValues="details">
    <div class="grid grid-cols-2 gap-2">
      <InputField type="text" validation="required" placeholder="اسم الموظف" name="name"/>
      <InputField type="text" validation="required|numeric" placeholder="كود الدولة" name="country_code"/>
      <InputField type="text" validation="required|numeric" placeholder="رقم التليفون" name="phone"/>
      <InputField type="text" validation="required|email" placeholder="البريد الالكترونى" name="email"/>
      <InputField type="password" validation="required" placeholder="كلمة المرور" name="password"/>
      <InputField type="password" validation="required" placeholder="تأكيد كلمة المرور" name="confirm_password"/>
      <InputField type="text" validation="" placeholder="العنوان" name="address"/>
      <div>
        <label class="mb-4">اختر دور الموظف</label>
        <div  class="grid grid-cols-4 gap-2">
          <div v-for="(item, key) in roles" :key="key">
            <Field v-slot="{ field }" name="roles" type="checkbox" :value="item.id">
              <label class="flex gap-2">
                <div class="checkbox-wrapper-45">
                  <input type="checkbox" name="roles" :id="item.id" v-bind="field" :value="item.id" />
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
                {{ item.name }}
              </label>
            </Field>
          </div>
        </div>
      </div>
    </div>
    <div class="sign-up__button-action mt-4">
      <AppButton type="submit" :loading="loading" submit-title="حفظ"></AppButton>
    </div>
  </ValidationForm>
</template>
<script setup>
import { ref } from 'vue'
import employeeServices from "../services/employee.services"

const roles = ref([])
const props = defineProps(['details'])
const emit = defineEmits(['finish'])
let loading = ref(false)

function getAllRoles () {
  employeeServices.getAllRoles().then(res => {
    roles.value = res.data.data
  })
}
getAllRoles()

function onsubmit (values) {
  loading.value = true
  if (Object.keys(props.details).length !== 0) {
    employeeServices.editUser({...values}).then(res => {
      emit('finish')
    }).finally(()=>{
      loading.value = false
    })
  } else {
    employeeServices.createUser({...values}).then(res => {
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
