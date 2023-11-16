<template>
  <Box class="p-5">
    <Dialog v-model:visible="visible" maximizable  modal :header="'إضافة منتج'" :style="{ width: '50vw' }">
      <productDetails @finish="loadingTable = true; visible = false" :details="details"/>
    </Dialog>
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">المنتجات</h5>
      <app-button v-if="$hasPer('products:create')" submit-title="إضف منتج جديد" class="rounded-lg font-medium !py-3" @click="visible = true">
        <template v-slot:icon>
          +
        </template>
      </app-button>
    </div>

    <main-table actionDots :list_url="'admin/products'" :loadingTable="loadingTable" :actions="actions"  :columns="columns">
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
      <template v-slot:product_unit="{data}">
        <div class="flex items-center gap-2 py-2">
         {{data.product_unit.name}}
        </div>
      </template>
    </main-table>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import Avatar  from 'primevue/avatar'
import productDetails from '../components/ProductDetails.vue'

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

</script>
