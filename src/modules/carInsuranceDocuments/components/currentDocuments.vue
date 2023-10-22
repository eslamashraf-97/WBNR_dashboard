<template>
  <Box>
    <div class="p-3">
      <div class="flex justify-between items-center">
        <h5 class="text-md mb-4">الوثائق الحالية</h5>
        <div class="flex gap-2">
          <button class="swiper-button-next rounded-md static left-auto right-auto w-[40px] h-[40px] bg-gray-200 !text-xl"></button>
          <button class="swiper-button-prev rounded-md static left-auto right-auto w-[40px] h-[40px] bg-gray-200 !text-xl"></button>
        </div>
      </div>
      <swiper
          :slides-per-view="1"
          :space-between="10"
          :modules="modules"
          :navigation= "{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          :breakpoints="{
            '768': {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            '1400': {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            '1800': {
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
          }"
          :pagination="{ clickable: true }"
          :scrollbar="{ draggable: true }"
      >
        <swiper-slide v-for="i in 5" :key="i">
          <div class="pt-14">
            <car-document />
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </Box>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import personImage from "@/assets/images/global/person.png";
import Avatar from "primevue/avatar";
import AvatarGroup from "primevue/avatargroup";
import AppButton from "@/components/global/AppButton.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import {Navigation} from 'swiper';


import 'swiper/css';
import 'swiper/css/navigation';
import CarDocument from "@modules/carInsuranceDocuments/components/carDocument.vue";

const modules = ref([Navigation])
</script>

<style scoped>
.swiper-button-next:after, .swiper-button-prev:after {
  font-size: unset !important;
}
</style>
