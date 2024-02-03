<template>
  <Box class="p-5">
    <Dialog
      v-model:visible="visible"
      maximizable
      modal
      :header="'تعديل الرساله'"
      :style="{ width: '50vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <ValidationForm
        @submit="onsubmit"
        v-slot="{ values }"
        :initialValues="details"
      >
        <InputField
          type="text"
          validation="required"
          placeholder="الرساله"
          name="message"
        />
        <div class="sign-up__button-action mt-4">
          <AppButton
            class=""
            type="submit"
            :loading="loading"
            submit-title="حفظ"
          ></AppButton>
        </div>
      </ValidationForm>
    </Dialog>

    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">رسائل الدعم</h5>
    </div>

    <main-table
      actionDots
      :actions="actions"
      :loading-table="loadingTable"
      :list_url="'admin/chat-auto-respond'"
      :columns="columns"
    >
      <template #message="{ data }">
        <div class="flex">
          <span v-html="data.message"> </span>
        </div>
      </template>
    </main-table>
  </Box>
</template>

<script setup>
import { ref } from "vue";
import messageServices from "../services/message.services";
import MainTextArea from "@/components/global/formElements/MainTextarea.vue";

const columns = [
  {
    header: "الرساله",
    field: "message",
  },
];
const details = ref();
const loading = ref(false);
const loadingTable = ref(false);
const visible = ref(false);
const actions = [
  {
    text: "تعديل",
    icon: "pi pi-pencil",
    action: (val) => {
      details.value = val;
      visible.value = true;
    },
  },
];

function onsubmit(details) {
  loading.value = true;
  loadingTable.value = false;
  console.log(details);
  messageServices
    .update(details.id, details)
    .then(() => {
      visible.value = false;
      loadingTable.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>
