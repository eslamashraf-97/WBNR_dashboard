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
          <div class="border-2 p-4 rounded-xl">
            <div class="pb-4 border-b border-primary border-dashed">
              <section class="flex justify-between items-center">
                <img src="@/assets/images/royal.png"/>
                <p class="flex gap-2 items-center">
                  <span class="text-mutedColor">مفعل</span>
                  <span class="relative h-2 w-2 rounded-full bg-emerald-400"></span>
                </p>
              </section>
              <h5 class="text-center text-dark text-xl my-4 font-medium">بروتيكت بلس   RO-21324</h5>
              <section class="flex justify-between items-center">
                <AvatarGroup>
                  <Avatar :image="personImage" size="medium" shape="circle" />
                  <Avatar :image="personImage" size="medium" shape="circle" />
                  <Avatar :image="personImage" size="medium" shape="circle" />
                  <Avatar :image="personImage" size="medium" shape="circle" />
                </AvatarGroup>
                <p class="flex gap-1 items-center">
                  <span class="text-dark text-xl font-bold">١٢٢٣</span>
                  <span class="text-gray-secondary text-xs font-medium">جنيه / شهريا</span>
                </p>
              </section>
            </div>
            <div class="py-4 border-b border-primary border-dashed">
              <p class="font-medium mb-2">
                <span class="text-primary text-base	">التغطية للفرد : </span>
                <span class="text-sm text-gray-secondary">حتى  جنيه٢٠٠،٠٠٠ سنويا</span>
              </p>
              <p class="font-medium mb-2">
                <span class="text-primary text-base	">كشف الطبيب : </span>
                <span class="text-sm text-gray-secondary">مغطى بنسبة ١٠٠٪</span>
              </p>
              <p class="font-medium mb-2">
                <span class="text-primary text-base	">العلاج الداخلي : </span>
                <span class="text-sm text-gray-secondary">مغطى بنسبة ١٠٠٪</span>
              </p>
              <p class="font-medium mb-2">
                <span class="text-primary text-base	">العلاج الداخلي : </span>
                <span class="text-sm text-gray-secondary">مغطى بنسبة ١٠٠٪</span>
              </p>
              <p class="font-medium">
                <span class="text-primary text-base	">تغطية الأسنان : </span>
                <span class="text-sm text-gray-secondary">حتى ١٥٠٠ جنيه للفرد بنسبة تحمل ٢٠٪</span>
              </p>
            </div>
            <div class="pt-4">
              <div>
                <p class="mb-0 text-xs text-dark">صالحة لمدة : </p>
                <div class="flex justify-between items-center gap-10">
                  <section class="flex items-center">
                    <div class="p-1 bg-white relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="31" viewBox="0 0 28 31" fill="none">
                        <path d="M0.2933 2.97991C0.16587 1.79738 1.09241 0.765625 2.28179 0.765625H25.4057C26.5951 0.765625 27.5217 1.79738 27.3942 2.97991L26.0649 15.316C26.0495 15.4584 26.0495 15.6021 26.0649 15.7445L27.3942 28.0806C27.5217 29.2631 26.5951 30.2949 25.4057 30.2949H2.28179C1.09241 30.2949 0.16587 29.2631 0.2933 28.0806L1.62264 15.7445C1.63799 15.6021 1.63799 15.4584 1.62264 15.316L0.2933 2.97991Z" fill="#E74040"/>
                      </svg>
                      <p class="absolute top-[7px] left-[11px] text-2xl text-white font-medium">4</p>
                    </div>
                    <div class="p-1 bg-white relative">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="31" viewBox="0 0 28 31" fill="none">
                        <path d="M0.2933 2.97991C0.16587 1.79738 1.09241 0.765625 2.28179 0.765625H25.4057C26.5951 0.765625 27.5217 1.79738 27.3942 2.97991L26.0649 15.316C26.0495 15.4584 26.0495 15.6021 26.0649 15.7445L27.3942 28.0806C27.5217 29.2631 26.5951 30.2949 25.4057 30.2949H2.28179C1.09241 30.2949 0.16587 29.2631 0.2933 28.0806L1.62264 15.7445C1.63799 15.6021 1.63799 15.4584 1.62264 15.316L0.2933 2.97991Z" fill="#E74040"/>
                      </svg>
                      <p class="absolute top-[7px] left-[11px] text-2xl text-white font-medium">0</p>
                    </div>
                    <p class="mx-1 text-sm text-dark font-normal">يوم</p>
                  </section>
                  <app-button class="border-primary !text-primary rounded-md text-2xl font-medium border bg-white flex-1" submit-title="التفاصيل"/>
                </div>
              </div>
            </div>
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

const modules = ref([Navigation])
</script>

<style scoped>
.swiper-button-next:after, .swiper-button-prev:after {
  font-size: unset !important;
}
</style>
