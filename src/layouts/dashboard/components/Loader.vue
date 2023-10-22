<template>
	<div class="overlay flex-center" v-if="ifShowLogin">
		<!-- <img src="@/assets/images/loader.gif" width="200" /> -->
	</div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const ifShowLogin = computed(() => store.getters['loading/getLoadingStatus']);
</script>

<style></style>
