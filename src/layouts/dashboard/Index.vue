<template>
	<div class="bg-lightGray-1 min-h-screen overflow-hidden h-full">
		<loader />
    <navbar @openMobileMenu="showMobileMenu = !showMobileMenu"/>
    <aside-menu :sidebarOpen="showMobileMenu"/>
    <div class="min-h-screen lg:pr-72 pt-24 pb-4 px-5">
      <main class="h-full" v-show="isNetworkOnline">
        <Transition>
          <router-view />
        </Transition>
      </main>
      <div v-if="!isNetworkOnline">
        <LottieFile :json="offline" />
      </div>
    </div>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import Navbar from './components/Navbar.vue';
import AsideMenu from './components/AsideMenu.vue';
import Loader from './components/Loader.vue';
import { core } from '@/plugins/scroll';
import offline from '@/assets/lottie/offline.json';

const showMobileMenu = ref(false);
const isNetworkOnline = ref(true);

onMounted(() => {
	core.index();
	window.addEventListener('offline', (event) => {
		isNetworkOnline.value = false;
	});

	window.addEventListener('online', (event) => {
		isNetworkOnline.value = true;
	});
});
</script>
<style>
.v-enter-active {
  transition: all 1s ease-out;
}

.v-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
