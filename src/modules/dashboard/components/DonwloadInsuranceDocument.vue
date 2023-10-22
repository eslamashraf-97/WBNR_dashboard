<template>
  <Box>
    <div class="px-12">
      <div class="flex justify-center gap-4 items-center py-12">
        <img src="@/assets/images/dashboard/document.svg" />
        <p class="text-dark text-xl font-medium m-0">تحميل وثيقة تأمين</p>
      </div>
      <div class="grid lg:grid-cols-3 gap-8">
        <input-field placeholder="ادخل الرقم التسلسلي للوثيقة"/>
        <input-field placeholder="أدخل رقم الهاتف المسجل"/>
        <input-field />
      </div>
    </div>
  </Box>
</template>

<script setup>
import InputField from "@/components/global/formElements/InputField.vue";
</script>

<style scoped>

</style>
