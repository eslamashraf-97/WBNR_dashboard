<template>
  <ValidationForm @submit="onsubmit" :initialValues="details">
    <div class="ld:grid grid-cols-2 gap-2">
      <InputField
        type="text"
        validation="required"
        placeholder="اسم التاجر"
        name="third_party_seller_name"
      />
      <InputField
        type="text"
        validation="required"
        placeholder="الاسم باللغه العربية"
        name="title_ar"
      />
      <InputField
        type="text"
        validation="required"
        placeholder="الاسم باللغه الانجليزية"
        name="title_en"
      />
      <!-- allow float numbers -->
      <InputField
        validation="required|between:0,99999999999999999999.99"
        type="text"
        placeholder="السعر"
        name="price"
      />
      <InputField
        type="text"
        validation="required|numeric"
        placeholder="الكمية"
        name="stock"
      />
      <InputField
        type="text"
        validation="required"
        placeholder="قيمة عمولة"
        name="minCommission"
      />
      <InputField
        type="text"
        validation="required"
        placeholder="السعر الموصى به"
        name="recommended_price"
      />
      <MainSelect
        :options="allCategories"
        name="category_id"
        validation="required"
        optionLabel="name"
        optionValue="id"
        placeholder="اختر القسم"
      />
      <MainSelect
        :options="countries"
        name="country_id"
        optionLabel="name"
        optionValue="id"
        validation="required"
        placeholder="اختر البلد"
      />
      <div class="col-span-2 mb-6">
        <Upload
          name="featured_image"
          label="الصورة الرئيسية"
          @upload="uploadImage"
          :imageValue="featured_image"
        />
      </div>
      <div class="col-span-2 flex flex-wrap gap-2 overflow-hidden">
        <Upload
          name="images"
          :label="` صوره ${key + 1}`"
          v-for="(item, key) in images"
          :imageValue="item.url"
          :key="key"
          @upload="uploadMultiImage"
          @deleteImage="deleteImage"
        />
        <section
          class="relative cursor-pointer md:w-[216px] h-[132px] rounded-xl border-2 border-mutedColor border-dashed flex items-center justify-center flex-col"
          @click="addNewImage"
        >
          <div class="flex flex-col items-center">
            <p class="text-gray-300 text-md mt-2 w-100 text-center font-semibold">
              رفع صورة جديدة +
            </p>
          </div>
        </section>
      </div>

      <div class="col-span-2 mb-6 my-5">
        <label class="capitalize p-0 font-semibold font-14 text-text-700 mb-4"
          >رفع فيديو</label
        >
        <template v-if="videos && videos.length" v-for="(item, key) in videos">
          <Upload
            name="video"
            video
            label="ارفع فيديو"
            @upload="uploadVideo"
            :imageValue="item.url"
            @deleteImage="deleteVideos"
          />
        </template>
        <template v-else>
          <Upload name="video" video label="ارفع فيديو" @upload="uploadVideo" />
        </template>
      </div>

      <div class="my-2 col-span-2">
        <label class="text-black text-lg">خصائص المنتج</label>
        <FieldArray name="variants" v-slot="{ fields, push, remove }">
          <div
            v-for="(field, idx) in fields"
            :key="field.key"
            class="p-3 rounded-2xl bg-gray-200 w-100 mb-2"
          >
            <div class="flex justify-between">
              <label class="text-black text-lg">معلومات رئيسية عن الخاصية</label>
              <div class="delete_box shadow" @click="remove">
                <i class="pi pi-trash text-white" />
              </div>
            </div>
            <div class="grid md:grid-cols-3 gap-x-8 items-center">
              <MainSelect
                :options="['كتابة', 'الوان']"
                :name="`variants[${idx}].type`"
                label="اختر النوع"
                validation="required"
                placeholder="اختر النوع"
              />
              <InputField
                :name="`variants[${idx}].name_ar`"
                class="col-span-1"
                label="الاسم بالعربى"
                validation="required"
              />
              <InputField
                :name="`variants[${idx}].name_en`"
                class="col-span-1"
                label="الاسم باللغه الانجليزية"
                validation="required"
              />
              <!--              <app-button type="button" class="col-span-1 bg-red-700" @click="remove(idx)">-->
              <!--                مسح-->
              <!--              </app-button>-->
            </div>
            <label class="text-black text-lg">قيم الخاصية</label>
            <FieldArray
              :name="`variants[${idx}].values`"
              v-slot="{ fields: f, push: p, remove: r }"
            >
              <div
                v-for="(fieldIn, ix) in f"
                :key="fieldIn.key"
                class="p-3 rounded-2xl bg-gray-200 w-100 mb-2"
              >
                <div
                  v-if="field.value.type == 'كتابة'"
                  class="grid grid-cols-3 gap-4 items-center"
                >
                  <InputField
                    :name="`variants[${idx}].values[${ix}].name_ar`"
                    label="الاسم بالعربى"
                    validation="required"
                  />
                  <InputField
                    :name="`variants[${idx}].values[${ix}].name_en`"
                    label="الاسم باللغه الانجليزية"
                    validation="required"
                  />
                  <app-button @click="r" class="!bg-red-600 text-white">مسج</app-button>
                </div>
                <div v-else-if="field.value.type == 'الوان'">
                  <InputField
                    :name="`variants[${idx}].values[${ix}].name_ar`"
                    class="col-span-1 !py-1"
                    label="اختر اللون"
                    validation="required"
                    type="color"
                  />
                  <InputField
                    v-if="false"
                    :name="`variants[${idx}].values[${ix}].name_en`"
                    class="col-span-1 !py-1"
                    label="اختر اللون"
                    validation="required"
                    type="color"
                  />
                  <app-button @click="r" class="!bg-red-600 text-white">مسج</app-button>
                </div>
              </div>
              <app-button
                v-if="field.value.type"
                type="button"
                class="!text-primary-300 !p-0 bg-transparent border-0"
                @click="
                  field.value.type == 'الوان'
                    ? p({ name_ar: '', name_en: '0' })
                    : p({ name_ar: '', name_en: '' })
                "
              >
                + أضف قيمة جديده
              </app-button>
            </FieldArray>
          </div>
          <app-button
            type="button"
            class="!text-primary-300 !p-0 bg-transparent border-0"
            @click="push({ name_ar: '', name_en: '', values: [], type: '' })"
          >
            + أضف خاصية جديده
          </app-button>
        </FieldArray>
      </div>
      <label :for="id" class="capitalize p-0 font-semibold font-14 text-text-700"
        >تفاصيل المنتج</label
      >
      <MainTextarea
        class="col-span-2"
        name="description"
        plceholder="تفاصيل المنتج"
      ></MainTextarea>
      <label :for="id" class="capitalize p-0 font-semibold font-14 text-text-700"
        >شرح المنتج</label
      >
      <MainTextarea
        class="col-span-2"
        name="catalog"
        plceholder="شرح المنتج"
      ></MainTextarea>
    </div>
    <Field v-slot="{ field }" name="is_featured" type="checkbox" value="true">
      <label class="flex gap-2">
        <div class="checkbox-wrapper-45">
          <input
            type="checkbox"
            name="terms"
            :id="'is_featured'"
            v-bind="field"
            value="true"
          />
          <label class="cbx" :for="'is_featured'">
            <div class="flip">
              <div class="front"></div>
              <div class="back">
                <svg width="14" height="12" viewBox="0 0 16 14">
                  <path d="M2 8.5L6 12.5L14 1.5"></path>
                </svg>
              </div>
            </div>
          </label>
        </div>
        منتج مرشح
      </label>
    </Field>
    <div class="sign-up__button-action mt-4">
      <AppButton
        class=""
        type="submit"
        :loading="loading"
        submit-title="حفظ المنتج"
      ></AppButton>
    </div>
  </ValidationForm>
</template>
<script setup>
import { ref, watch } from "vue";
import MainSelect from "@/components/global/formElements/MainSelect.vue";
import MainTextarea from "@/components/global/formElements/MainTextarea.vue";
import Upload from "@/components/global/formElements/Upload.vue";
import productServices from "../services/product.services.js";
import { useCountries } from "../../country/composables";
import categoryServices from "@modules/category/services/category.services";

const { countries } = useCountries();
const props = defineProps(["details"]);
const emit = defineEmits(["finish"]);
let featured_image = ref(props.details?.featured_image || "");
let videos = ref(props.details?.videos || []);
let images = ref(
  props.details?.images || [
    {
      url: "",
    },
  ]
);
console.log(props.details);
let loading = ref(false);
const allCategories = ref([]);

function deleteImage(image) {
  console.log(images.value);
  console.log(image);
  let ind = images.value.findIndex((data) => data === image);
  console.log("ind => ", ind);
  images.value.splice(ind, 1);
}
function deleteVideos(video) {
  console.log(videos.value);
  console.log(video);
  let ind = videos.value.findIndex((data) => data === video);
  console.log("ind => ", ind);
  videos.value.splice(ind, 1);
}
function getAllCategory() {
  categoryServices.getAllCategory().then((res) => {
    allCategories.value = res.data.data;
  });
}
getAllCategory();
function addNewImage() {
  if (images.value.length) {
    if (images.value[images.value.length - 1].url) {
      images.value.push({
        url: "",
      });
    }
  } else {
    images.value.push({
      url: "",
    });
  }
}
function uploadImage(val) {
  featured_image.value = val;
}
function uploadMultiImage(val) {
  images.value[images.value.length - 1].url = val;
}
function uploadVideo(val) {
  videos.value = [
    ...videos.value,
    {
      url: val,
    },
  ];
}
function onsubmit(values) {
  loading.value = true;
  try {
    if (Object.keys(props.details).length !== 0) {
      productServices
        .editProduct({
          ...values,
          images: images.value,
          featured_image: featured_image.value,
          videos: videos.value ?? [],
          unit_id: "1",
          is_featured: Boolean(values.is_featured),
        })
        .then((res) => {
          emit("finish");
        })
        .finally(() => {
          loading.value = false;
        });
    } else {
      console.log("values => ", values);
      productServices
        .createProduct({
          ...values,
          images: images.value,
          featured_image: featured_image.value,
          videos: videos.value ?? [],
          unit_id: "1",
          is_featured: Boolean(values.is_featured),
        })
        .then((res) => {
          emit("finish");
        })
        .finally(() => {
          loading.value = false;
        });
    }
  } catch (err) {
    console.log(err.message);
  }
}
watch(
  () => props.details,
  (data) => {
    images.value = data.images.map((im) => im.url);
    videos.value = data.videos.map((im) => im.url);
  }
);
</script>
<style></style>
