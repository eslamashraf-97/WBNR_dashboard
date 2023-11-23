<template>
  <div class="flex flex-col gap-4 md:w-[216px]">
    <div v-if="imageUrl" @click="imageUrl= ''; progressBar = false, $emit('deleteImage', imageBack)"  class="relative cursor-pointer w-100 md:w-[216px] !h-[132px] w-100 rounded-xl border-2 border-mutedColor border-dashed bg-center	 flex-col bg-contain bg-no-repeat	" :style="{ backgroundImage: 'url(' + imageUrl + ')' }">
      <div class="delete_box shadow">
        <i class="pi pi-trash text-white" />
      </div>
    </div>
    <div v-else>
      <section class="relative cursor-pointer w-100 md:w-[216px] !h-[132px] w-100 rounded-xl border-2 border-mutedColor border-dashed flex items-center justify-center flex-col">
        <Field  :name="name" v-slot="{ field, meta, errors }"
                :rules="required ? 'required' : ''"
                validate-on-input
                validate-on-change
                validate-on-model-update
                validate-on-blur
                type="file"
        >
          <input
              @change="previewAttachemnt"
              v-bind="field"
              placeholder="placeholder"
              type="file"
              class="absolute w-full h-full top-0 lef-0 opacity-0"
              :ref="file"
          />
          <div class="flex flex-col items-center">
            <Icon :name="progressBar == 100 ? 'ep:success-filled' : 'bytesize:upload'" class="text-3xl text-teal-600" />
            <p class="text-primary-300 text-md mt-2 w-100 text-center font-semibold">
              {{ progressBar == 100 ? `تم رفع  ${label} بنجاح ` : label }}
            </p>
          </div>
        </Field>
      </section>
      <div v-show="progressBar" class="rounded h-[4px] bg-primary-300" ref="line"></div>
      <ErrorMessage :name="name" as="div">
        <template v-slot:default="{message}">
          <span class="text-red-600">
            <Icon name="fluent-mdl2:error" />
            {{message}}
          </span>
        </template>
      </ErrorMessage>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import mainServices from '@/services/index.js'

const file = ref('file')
const imageUrl = ref('')
const imageBack = ref('')
const progressBar = ref(false)
const emit = defineEmits(['uploadImageUrl'])
const props = defineProps({
  label: {
    type: String
  },
  name: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  }
})
const line = ref('')
function previewAttachemnt (e) {
  const fd = new FormData()
  var files = e.target.files || e.dataTransfer.files
  if (!files.length) return
  fd.append('image', files[0], files[0].name)
  var config = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent
      const percent = Math.floor((loaded * 100) / total)
      console.log(line.value.style)
      line.value.style.opacity = percent+'%'
      line.value.style.width = percent+'%'
      progressBar.value = percent
    }
  }
  mainServices.uploadImage(fd, config).then(res => {
    // console.log('res ', res.data.url)
    imageUrl.value = res.data.full_url
    imageBack.value = res.data.url
    // debugger
    emit('uploadImageUrl', res.data.url)
    // debugger
  }).catch(err => {
    progressBar.value = 0
  })
  createAttachemnt(files[0])
  // uploaded.value = true
}
function createAttachemnt (file) {
  var reader = new FileReader()
  reader.readAsDataURL(file)
}

</script>

<style>
.delete_box {
  background: red;
  border-radius: 5px;
  width: 35px;
  display: flex;
  height: 35px;
  justify-content: center;
  align-items: center;
}
</style>
