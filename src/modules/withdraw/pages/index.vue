<template>
  <Box class="p-5">
    <Dialog v-model:visible="visible" maximizable  modal :header="'سحب جديد'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <ValidationForm @submit="onsubmit" 	v-slot="{ values }" :initialValues="details" >
        <InputField type="text" validation="required" placeholder="اسم" name="name"/>
        <InputField type="text" validation="required" placeholder="القيمة" name="amount"/>
        <div class="sign-up__button-action mt-4">
          <AppButton class="" type="submit" :loading="loading" submit-title="حفظ"></AppButton>
        </div>
      </ValidationForm>
    </Dialog>

    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">السحب</h5>
      <app-button v-if="$hasPer('products:create')" submit-title="سحب جديد" class="rounded-lg font-medium !py-3" @click="visible = true; details={}">
        <template v-slot:icon>
          +
        </template>
      </app-button>
    </div>

    <main-table actionDots :actions="actions" :loading-table="loadingTable" :list_url="'admin/finances/withdraws'" :columns="columns">
    </main-table>

  </Box>
</template>

<script setup>
import { ref } from 'vue'
import withdrawServices from '../services/withdraw.services'

const columns = [
  {
    header: 'الاسم',
    field: 'name'
  },
  {
    header: 'السعر',
    field: 'amount'
  }
  ]
const details = ref()
const loading = ref(false)
const loadingTable = ref(false)
const visible = ref(false)
const actions = [
  {
    text: 'مسح',
    icon:'pi pi-trash',
    permission: 'products:force_remove',
    action: (val) => window.showDeleteModal({
      title: 'سحب',
      id: val.id,
      url: 'admin/finances',
    })
  }
]

function onsubmit (details) {
  loading.value = true
  loadingTable.value = false
  withdrawServices.createWithdraw(details).then(() => {
    visible.value = false
    loadingTable.value = true
  }).finally(() => {
    loading.value = false
  })
}
</script>
