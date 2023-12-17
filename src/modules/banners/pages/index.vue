<template>
  <Box class="p-5">
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">اللافتات</h5>
    </div>
    <div class="flex gap-4">
      <div  v-for="(item, key) in allBanners" class="relative w-100 md:w-[216px] !h-[132px] w-100 rounded-xl border-2 border-mutedColor border-dashed bg-center	 flex-col bg-contain bg-no-repeat	" :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }">
        <div class="delete_box shadow cursor-pointer" @click="deleteImage(item.id)">
          <i class="pi pi-trash text-white" />
        </div>
      </div>
      <Upload name="new" label="رفع صورة جديدة" @upload="uploadImage" resetAfterLoad/>
    </div>
  </Box>
</template>

<script setup>
import Upload from "@/components/global/formElements/Upload.vue"

import bannerService from '../services/banner.services'
import { ref } from "vue";

const allBanners = ref([])
const loading = ref(false)
function getAllBanners () {
  loading.value = true
  bannerService.getAllBanner().then(res => {
    allBanners.value = res.data.data
  }).finally(() => {
    loading.value = false
  })
}
getAllBanners()

function uploadImage (val) {
  bannerService.createBanner({imageUrl: val}).then(()=>{
    getAllBanners()
  })
}
function deleteImage(id) {
  bannerService.deleteBanner(id).then(()=>{
    getAllBanners()
  })
}
</script>
