<template>
  <div class="flex flex-col gap-4 md:w-[216px]">
    <section class="relative cursor-pointer w-100 md:w-[216px] !h-[132px] h-full rounded-xl border-2 border-mutedColor border-dashed flex items-center justify-center flex-col" @click="file.click">
      <Field :name="name" v-slot="{ field, meta, errors }"
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
            class="absolute"
            :ref="file"
           v-show="false"
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
</template>

<script setup>
import { ref } from 'vue'
import mainServices from '@/services/index.js'

const file = ref('file')
const progressBar = ref(false)
const emit = defineEmits(['upload'])

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
    emit('upload', res.data.url)
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

</style>
