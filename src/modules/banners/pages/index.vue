<template>
  <Box class="p-5">
    <Dialog
      v-model:visible="visible"
      maximizable
      modal
      :header="edit ? 'تعديل' : 'إضافة'"
      :style="{ width: '50vw' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <div>
        <ValidationForm @submit="onsubmit" :initialValues="details" v-slot="{ values }">
          <InputField
            type="text"
            validation="required"
            placeholder="اللينك"
            name="path"
          />
          <MainSelect
            :options="countries"
            name="country_id"
            optionLabel="name"
            optionValue="id"
            validation="required"
            placeholder="اختر البلد"
          />
          <Upload
            name="imageUrl"
            label="رفع صورة"
            @upload="uploadImage"
            :imageValue="url"
          />
          <div class="sign-up__button-action mt-4">
            <AppButton
              class=""
              type="submit"
              :loading="loading"
              submit-title="حفظ "
            ></AppButton>
          </div>
        </ValidationForm>
      </div>
    </Dialog>
    <div class="flex justify-between items-center border-b-2 pb-3 mb-4">
      <h5 class="text-md mb-4">التواصل الاجتماعى</h5>
      <app-button
        v-if="$hasPer('products:create')"
        submit-title="إضف جديد"
        class="rounded-lg font-medium !py-3"
        @click="
          visible = true;
          details = {};
          edit = false;
        "
      >
        <template v-slot:icon> + </template>
      </app-button>
    </div>
    <main-table
      actionDots
      :list_url="'admin/banner'"
      :loadingTable="loadingTable"
      :actions="actions"
      :filters="filter"
      :columns="columns"
    >
      <template v-slot:imageUrl="{ data }">
        <Avatar class="image-url" :image="data.imageUrl" :alt="data.imageUrl" />
      </template>
      <template v-slot:country_id="{ data }">
        <span>{{ data?.country?.name ?? 'عامه' }}</span>
      </template>
    </main-table>
  </Box>
</template>

<script setup>
import { ref } from "vue";
import Avatar from "primevue/avatar";
import Upload from "@/components/global/formElements/Upload.vue";
import bannerServices from "../services/banner.services";
import { useCountries } from "../../country/composables";
const { countries } = useCountries();

const loadingTable = ref(false);
const columns = [
  {
    field: "id",
    header: "#",
  },
  {
    field: "imageUrl",
    header: "الصورة",
  },
  {
    field: "path",
    header: "الرابط",
  },
  {
    field: "country_id",
    header: "البلد",
  },
];
function uploadImage(val) {
  url.value = val;
}
const actions = [
  {
    text: "مسح",
    icon: "pi pi-trash",
    action: (val) =>
      window.showDeleteModal({
        title: "تواصل",
        id: val.id,
        url: "admin/banner",
      }),
  },
];
function onsubmit(data) {
  console.log(details.value);
  const payload = {
    ...data,
    imageUrl: url.value,
  };
  console.log(payload);
  bannerServices.createBanner(payload).then((res) => {
    console.log(res);
  });
}
const details = ref({});
const visible = ref(false);
const url = ref("");
const filter = ref({ title: null, country_id: null });
const edit = ref(false);
</script>
