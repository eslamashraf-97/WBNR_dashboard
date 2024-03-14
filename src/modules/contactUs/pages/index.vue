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
    </main-table>
  </Box>
</template>

<script setup>
import { ref } from "vue";
import Avatar from "primevue/avatar";

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
];

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
