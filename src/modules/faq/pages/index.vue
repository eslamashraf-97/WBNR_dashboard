<template>
  <Box class="p-5">
    <Dialog v-model:visible="visible" maximizable  modal :header="'إضافة سؤال'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <faqDetails @finish="loadingTable = true; visible = false" :details="details"/>
    </Dialog>
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">الاسأله الشائعة</h5>
      <app-button submit-title="إضف سؤال" class="rounded-lg font-medium !py-3" @click="visible = true">
        <template v-slot:icon>
          +
        </template>
      </app-button>
    </div>

    <main-table actionDots :list_url="'admin/faq'" :loadingTable="loadingTable" :actions="actions"  :columns="columns">
    </main-table>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import faqDetails from '../components/FaqDetails.vue'
const loadingTable = ref(false)
const columns = [
  {
    header: 'السؤال بالعربية',
    field: 'question_ar'
  },
  {
    header: 'السؤال بالانجليزية',
    field: 'question_en'
  },
  {
    header: 'الاجابة بالعربية',
    field: 'answer_ar'
  },
  {
    header: 'الاجابة بالعربية',
    field: 'answer_en'
  },
]
const actions = [
  {
    text: 'تعديل',
    permission: 'faq:edit',
    icon:'pi pi-pencil',
    action: (val) => {
      details.value = val
      visible.value = true
    }
  },
  {
    text: 'مسح',
    permission: 'faq:soft_remove',
    icon:'pi pi-trash',
    action: (val) => window.showDeleteModal({
      title: 'سؤال',
      id: val.id,
      url: 'admin/faq',
    })
  }
]

const details = ref({})
const visible = ref(false)

</script>
