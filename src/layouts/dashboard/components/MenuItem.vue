<template>
	<div class="flex min-h-0 flex-1 flex-col">
		<div class="flex flex-1 flex-col overflow-y-auto pt-4 px-2">
      <div class="profile px-3 flex gap-2 items-center py-2 border-b">
          <span class="inline-block ring-1 h-10 w-10 overflow-hidden rounded-full bg-gray-100">
            <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
          <h5 class="text-sm flex gap-1">
            <span class="font-medium">مرحبا,</span>
            <span class="text-gray-secondary font-medium">{{ userInfo?.name }}</span>
          </h5>
      </div>
			<nav
				class="flex-1 space-y-1 px-2 justify-between mt-3"
				id="sidebar-scrollbar"
			>
<!--        {{sidebar}}-->
        <template 	v-for="(item, key) in sidebar"  :key="key">

          <router-link
              :to="{name: item.routeName}"
              :class="'hover:cursor-pointer block text-secondary group py-3 px-4 mb-3'"
          >
            <div class="flex justify-between">
              <span class="flex gap-2 items-center">
                <span v-html="item.icon"></span>
                <span class="text-md font-medium">{{ item.name }}</span>
              </span>
            </div>
          </router-link>
        </template>
			</nav>
		</div>
		<div>
			<section
				:class="'hover:cursor-pointer lg:block group px-4 py-0 pb-3 text-base font-medium hidden'"
			>
        <div class="bg-primary-300/10 p-4 rounded-main">
          <p class="text-primary text-center text-sm mb-4">
            إضافة منتج جديد الان
          </p>
          <img src="@/assets/images/dashboard.png" class="m-auto w-[50%]"/>
          <div class="flex justify-center mt-4">
            <app-button submit-title="إضافة منتج جديد" class="rounded-[5px]" class-content="px-8 py-1 text-sm"></app-button>
          </div>
        </div>
        <div class="mt-4 border-t border-dashed border-gray-secondary pt-4">
          <app-button submit-title="تسجيل الخروج" class-content="rounded-lg w-full py-2 bg-white text-sm !text-secondary border border-mutedColor">
            <template v-slot:icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M4.69141 1.73077V0.5H15.7683V14.0385M4.69141 11.5769V14.0385H10.8453" stroke="#737373" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M15.7692 14.0385L10.8462 16.5V2.96154L15.7692 0.5M8.38462 6.65385H1M1 6.65385L3.46154 4.19231M1 6.65385L3.46154 9.11538" stroke="#737373" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </template>
          </app-button>
        </div>
			</section>
		</div>
	</div>
</template>
<script setup>
import sidebar from '@/fakeData/sidebar';

const userInfo = JSON.parse(localStorage.getItem('userInfo'))
</script>
