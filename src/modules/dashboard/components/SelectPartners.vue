<template>
  <div class="flex gap-8 h-auto lg:flex-row flex-col lg:h-48 mb-5">
    <partners :image="carSetting" title="شركات الفحص فني"/>
    <partners :image="microscopeImage" title="معامل التحاليل"/>
    <partners :image="compnyImage" title="شركات التأمين"/>
  </div>
</template>
<script setup>
import carSetting from "@/assets/images/dashboard/car-setting.png";
import microscopeImage from "@/assets/images/dashboard/microscope.png";
import compnyImage from "@/assets/images/dashboard/company.svg";
import Partners from "@/components/global/cards/partners.vue";
</script>
