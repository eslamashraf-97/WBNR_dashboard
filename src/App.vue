<template>
	<div>
    <delete-modal ref="deleteModalRef" :data="deleteData"/>
		<toast />
		<RouterView />
	</div>
</template>
<script setup>
import {ref } from 'vue'
import { useStore } from 'vuex';
import DeleteModal from "@/components/global/deleteModal.vue";
const deleteData = ref({})
const deleteModalRef = ref(null)
window.showDeleteModal = function(data) {
    deleteModalRef.value.showModal(data)
}

const store = useStore();

function handleLanguages() {
	let allLang = store.getters['languages/getLangOptions'];
	let langInLocal = localStorage.getItem('lang') || 'ar';
	store.commit(
		'languages/changeLang',
		allLang.find((lang) => lang.value == langInLocal)
	);
}
handleLanguages();

</script>
