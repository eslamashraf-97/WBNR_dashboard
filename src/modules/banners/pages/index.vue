<template>
  <Box class="p-5">
    <Dialog v-model:visible="visible" maximizable  modal :header="'إضافة قسم'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <categoryDetails @finish="loadingTable = true; visible = false" :details="details" :selectedID="selcetedCat?.id"/>
    </Dialog>
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">الاقسام</h5>
      <app-button submit-title="إضف قسم مستوى اول" class="rounded-lg font-medium !py-3" @click="visible = true"  v-if="$hasPer('product_categories:create')">
        <template v-slot:icon>
          +
        </template>
      </app-button>
    </div>

    <div class="flex flex-col md:flex-row flex-nowrap gap-2">
      <div class="flex-1">
        <label class="tex-2xl text-gray-700 font-semibold">المستوى الاول </label>
        <main-table actionDots :list_url="'admin/product-category'" :loadingTable="loadingTable" :actions="actions"  :columns="columns">
          <template v-slot:description="{data}">
            <p v-html="data.description"></p>
          </template>
        </main-table>
      </div>

      <div class="flex-1" v-if="level2">
        <label class="tex-2xl text-gray-700 font-semibold">المستوى الثانى </label>
        <main-table actionDots :list_data="level2" :loadingTable="loadingTable" :actions="actions2"  :columns="columns">
          <template v-slot:description="{data}">
            <p v-html="data.description"></p>
          </template>
        </main-table>
      </div>

      <div class="flex-1">
        <label class="tex-2xl text-gray-700 font-semibold">المستوى الثالث </label>
        <main-table actionDots  :list_data="level3" :loadingTable="loadingTable" :actions="mainActions"  :columns="columns">
          <template v-slot:description="{data}">
            <p v-html="data.description"></p>
          </template>
        </main-table>
      </div>
    </div>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import Avatar  from 'primevue/avatar'
import categoryDetails from '../components/CategoryDetails.vue'

const loadingTable = ref(false)
const columns = [
  {
    header: 'اسم القسم',
    field: 'name'
  },
  {
    header: 'الوصف',
    field: 'description'
  }
]
const mainActions = [
  {
    text: 'تعديل',
    icon:'pi pi-pencil',
    permission: 'product_categories:edit',
    action: (val) => {
      details.value = val
      visible.value = true
    }
  },
  {
    text: 'مسح',
    icon:'pi pi-trash',
    permission: 'product_categories:force_delete',
    action: (val) => window.showDeleteModal({
      title: 'قسم',
      id: val.id,
      url: 'admin/product-category',
    })
  }
]
const actions = [
  {
    text: 'الاقسام الداخلية',
    icon: 'pi pi-eye',
    action: (val) => {
      level3.value = []
      level2.value = val.sub_categories
    },
  },
  {
    text: 'أضافة قسم فرعى',
    icon:'pi pi-plus',
    permission: 'product_categories:create',
    action: (val) => {
      visible.value = true
      selcetedCat.value = val
    }
  },
    ...mainActions
]
const actions2 = [
  {
    text: 'الاقسام الداخلية',
    icon:'pi pi-eye',
    action: (val) => {
      level3.value = val.sub_categories
    }
  },
  {
    text: 'أضافة قسم فرعى',
    icon:'pi pi-plus',
    action: (val) => {
      visible.value = true
      selcetedCat.value = val
    }
  },
  ...mainActions
]
const level2 = ref([])
const level3 = ref([])
const details = ref({})
const visible = ref(false)
const selcetedCat = ref({})

</script>
