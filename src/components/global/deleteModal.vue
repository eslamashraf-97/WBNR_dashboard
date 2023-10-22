<template>
  <Dialog v-model:visible="visible"
          :showHeader="false"
          :draggable="false"
          :closable="false"
          :breakpoints="{'960px': '75vw', '640px': '80vw'}"
          :style="{width: '600px'}"
          :modal="true"
          contentClass="remove-padding"
  >
          <div class="rounded-lg bg-white text-left transition-all">
            <div class="bg-white p-8">
              <div class="sm:flex sm:items-start gap-2">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900 text-start" id="modal-title">{{ deleteRow.textDeleteButton }} {{ deleteRow.title }}</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500 text-start">{{ deleteRow.question }} {{deleteRow.text}}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-main-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
              <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" @click="deleteData" v-if="!loadingDelete">
                {{ deleteRow.textDeleteButton }}</button>
              <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" disabled v-else>
                <ProgressSpinner  style="width: 20px; height: 20px"/>
              </button>
              <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="visible = false">
                {{ deleteRow.textCancelButton }}
              </button>
            </div>
          </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import mainService from '@/services/index'
import useEmitter from '@/plugins/emitter'
import ProgressSpinner from 'primevue/progressspinner';
const emitter = useEmitter()

const visible = ref(false)
const loadingDelete = ref(false)

const deleteRow = ref({title: '', question: '', textCancelButton: '', textDeleteButton: '', text: '' })
function showModal(opts) {
  console.log(opts)
  deleteRow.value.title = opts.title
  deleteRow.value.question = opts.question ? opts.question : 'هل انت متاكد انك تريد مسح البيانات ؟'
  deleteRow.value.textDeleteButton = opts.textDeleteButton ? opts.textDeleteButton : 'مسح'
  deleteRow.value.textCancelButton = opts.textCancelButton ? opts.textCancelButton : 'الغاء'
  deleteRow.value.text = opts.text ? opts.text : 'فى حاله المسح لا يمكنك استرداد المعلومات مره اخرى'
  deleteRow.value.icon = opts.icon ? opts.icon : ''
  deleteRow.value.url = opts.url
  deleteRow.value.rowId = opts.rowId ? opts.rowId : opts.id
  deleteRow.value.methodFunction = opts.methodFunction ? opts.methodFunction : 'delete'
  visible.value = true
}

function deleteData() {
  loadingDelete.value = true
  mainService.removeData(deleteRow.value.url, deleteRow.value.rowId,'', deleteRow.value.methodFunction).then(() => {
    visible.value = false
    emitter.emit("reloadAfterDelete")
  }).finally(() => loadingDelete.value = false )
}

defineExpose({
  showModal
})
</script>

<style>
.remove-padding {
  padding: 0 !important;
  direction: rtl;
}
</style>
