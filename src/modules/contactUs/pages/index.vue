<template>
  <Box class="p-5">
    <div class="mb-4">
      <div class="flex justify-between items-center border-b-2 pb-3 mb-4">
        <h5 class="text-md mb-4">
          <span class="text-primary">الرسائل</span>
        </h5>
      </div>
    </div>
    <main-table
      actionDots
      :list_url="'admin/contact-us'"
      :loadingTable="loadingTable"
      :columns="columns"
      :showActions="false"
    >
    <template v-slot:resolved="{data}">
        <InputSwitch v-model="data.resolved" @change="toggle(data.id, data.resolved)"/>
      </template>
    </main-table>
  </Box>
</template>

<script setup>
import { ref } from "vue";
import Avatar from "primevue/avatar";
import contactUsServices from "../services/contactUs.services";

const loadingTable = ref(false);
const columns = [
  {
    field: "name",
    header: "الاسم",
  },
  {
    field: "email",
    header: "البريد الالكتروني",
  },
  {
    field: "phone",
    header: "رقم الهاتف",
  },
  {
    field: 'message',
    header: 'الرساله'
  },
  {
    field: 'resolved',
    header: 'تم الحل'
  }
];
function toggle(id, resolved) {
  contactUsServices.toggle(id, {resolved}).then((res) => {
    console.log(res);
  });
}

</script>
<style>
.circle-product {
  width: 50px;
  height: 50px;
}
.circle-product img {
  width: 100%;
  height: 100%;
}
</style>
