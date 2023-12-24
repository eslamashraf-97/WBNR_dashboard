<template>
  <Box class="p-5">
    <Dialog v-model:visible="visible" maximizable  modal :header="'إضافة منتج'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <productDetails @finish="loadingTable = true; visible = false" :details="details"/>
    </Dialog>
    <div class="mb-4">
      <div class="flex justify-between items-center border-b-2 pb-3 mb-4">
        <h5 class="text-md mb-4">المنتجات</h5>
        <app-button v-if="$hasPer('products:create')" submit-title="إضف منتج جديد" class="rounded-lg font-medium !py-3" @click="visible = true; details={}">
          <template v-slot:icon>
            +
          </template>
        </app-button>
      </div>
      <div>
        <p>تصفية :</p>
        <div class="flex gap-4">
        <input type="text"  placeholder="بحث باسم المنتج" class="filterInput w-full" v-model="filter.title" />
        <Dropdown
          class="w-full"
          :options="countries"
          optionLabel="name"
          optionValue="id"
          :inputClass="`max-w-full capitalize h-[47px]`"
          placeholder="اختر البلد"
          v-model="filter.country_id"
        >
        </Dropdown>
        </div>
      </div>
    </div>
    <main-table actionDots :list_url="'admin/products'" :loadingTable="loadingTable" :actions="actions" :filters="filter"  :columns="columns">
      <template v-slot:img="{data}">
        <div class="flex items-center gap-2 py-2">
          <Avatar :image="data.featured_image" size="large" shape="circle" />
          {{data.title}}
        </div>
      </template>
      <template v-slot:country="{data}">
        <div class="flex items-center gap-2 py-2">
          <img class="flag" :src="data.country.image">
        </div>
      </template>
      <template v-slot:price="{data}">
        <div class="flex items-center gap-2 py-2">
         {{data.price}}  {{data.country.currency}}
        </div>
      </template>
      <template v-slot:active="{data}">
        <InputSwitch v-model="data.is_active" @change="toggle(data.id, data.is_active)"/>
      </template>
      <template v-slot:product_unit="{data}">
        <div class="flex items-center gap-2 py-2">
         {{data.product_unit.name}}
        </div>
      </template>
    </main-table>

  </Box>
</template>

<script setup>
import { ref, watch } from "vue";
import Avatar  from 'primevue/avatar'
import productDetails from '../components/ProductDetails.vue'
import productService from "../services/product.services";
import { useCountries } from "../../country/composables";

const loadingTable = ref(false)
const columns = [
  {
    header: 'كود المنتج',
    field: 'code'
  },
  {
    header: 'اسم المنتج',
    field: 'img'
  },
  {
    header: 'المدينة',
    field: 'country'
  },
  {
    header: 'السعر',
    field: 'price'
  },{
    header: 'اكبر قيمة عمولة',
    field: 'maxCommission'
  },
  {
    header: 'اقل قيمة عمولة',
    field: 'minCommission'
  },
  {
    header: 'عدد مرات البيع',
    field: 'orderCompletedCount'
  },
  {
    header: 'نسبة المبيعات',
    field: 'orderCompletedPercentage'
  },
  {
    header: 'الوحدة',
    field: 'product_unit'
  },
  {
    header: 'اسم التاجر',
    field: 'third_party_seller_name'
  },
  {
    header: 'مفعل',
    field: 'active'
  }
]
const actions = [
  {
    text: 'تعديل',
    icon:'pi pi-pencil',
    permission: 'products:edit',
    action: (val) => {
      details.value = val
      visible.value = true
    }
  },
  {
    text: 'مسح',
    icon:'pi pi-trash',
    permission: 'products:force_remove',
    action: (val) => window.showDeleteModal({
      title: 'منتج',
      id: val.id,
      url: 'admin/products',
    })
  }
]

const details = ref({})
const visible = ref(false)
const filter = ref({title: null, country_id: null})
const { countries } = useCountries()
function toggle(id, status) {
  productService.switchStatus(id, status ? true : false)
}
</script>
