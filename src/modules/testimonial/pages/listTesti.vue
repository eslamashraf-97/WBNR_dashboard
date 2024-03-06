<template>
  <Box class="p-5">
    <div class="mb-4">
      <div class="flex justify-between items-center border-b-2 pb-3 mb-4">
        <h5 class="text-md mb-4">المنتجات</h5>
        <app-button
          v-if="$hasPer('products:create')"
          class="rounded-lg font-medium !py-3"
          @click="$router.push({ name: 'testimonials.create' })"
          submit-title="اضافه راي جديد"
        >
          <template v-slot:icon> + </template>
        </app-button>
      </div>
    </div>
    <main-table
      actionDots
      :list_url="'admin/testimonial'"
      :loadingTable="loadingTable"
      :actions="actions"
      :filters="filter"
      :columns="columns"
    >
      <template v-slot:marketer_image="{ data }">
        <Avatar
          class="circle-product"
          :image="data.marketer_image"
          shape="circle"
          size="large"
        />
      </template>
    </main-table>
  </Box>
</template>

<script setup>
import { ref, watch } from "vue";
import Avatar from "primevue/avatar";
import { useRouter } from "vue-router";

const loadingTable = ref(false);
const columns = [
  {
    field: "marketer_name",
    header: "اسم المسوق",
  },
  {
    field: "testimonial",
    header: "الرأي",
  },
  {
    field: "description",
    header: "الدولة",
  },
  {
    field: "marketer_image",
    header: "صورة المسوق",
  },
];
const router = useRouter();
const actions = [
  {
    text: "تعديل",
    icon: "pi pi-pencil",
    permission: "products:edit",
    action: (val) => {
      router.push({ name: "testimonial.edit", params: { id: val.id } });
    },
  },
  {
    text: "مسح",
    icon: "pi pi-trash",
    permission: "products:force_remove",
    action: (val) =>
      window.showDeleteModal({
        title: "منتج",
        id: val.id,
        url: "admin/testimonial",
      }),
  },
];

const details = ref({});
const visible = ref(false);
const filter = ref({ title: null, country_id: null });
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
