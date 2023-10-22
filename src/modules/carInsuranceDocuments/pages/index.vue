<template>
  <div>
    <current-documents />
    <div class="grid md:grid-cols-3 mt-10 gap-8">
      <div class="md:col-span-2">
        <transactions />
      </div>
      <div class="md:col-span-1 h-full">
        <partners :image="carImage" title="شركات الفحص فني"/>
      </div>
    </div>
    <div class="mt-10">
      <h5 class="text-md mb-4">جميع الوثائق</h5>
      <Box class="p-3">
        <main-table :show-actions="false" :list_data="listData" :columns="columns">
          <template v-slot:name="{data}">
            <div class="flex items-center gap-2 py-2">
              <img src="@/assets/images/dashboard/company.svg" />
              <span>{{ data.name }}</span>
            </div>
          </template>
        </main-table>
      </Box>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CurrentDocuments from "@modules/carInsuranceDocuments/components/currentDocuments.vue";
import carImage from "@/assets/images/dashboard/car-setting.png";
import Partners from "@/components/global/cards/partners.vue";
import Transactions from "@modules/healthInsuranceDocuments/components/transactions.vue";
import MainTable from "@/components/global/table/MainTable.vue";

const listData = ref([
  {
    name: 'ميجا بلس  ٢٣٤٥٨٧-AL',
    company: 'Allianz',
    expired: '٢٠٢٣/١٢/١٣',
    plate_number: 'ب ل / ٢٣٢٣',
    subscribtionFees: '٣٤،٤٥٠ ج/ سنويا'
  },
  {
    name: 'ميجا بلس  ٢٣٤٥٨٧-AL',
    company: 'Allianz',
    expired: '٢٠٢٣/١٢/١٣',
    plate_number: 'ب ل / ٢٣٢٣',
    subscribtionFees: '٣٤،٤٥٠ ج/ سنويا'
  },
  {
    name: 'ميجا بلس  ٢٣٤٥٨٧-AL',
    company: 'Allianz',
    expired: '٢٠٢٣/١٢/١٣',
    plate_number: 'ب ل / ٢٣٢٣',
    subscribtionFees: '٣٤،٤٥٠ ج/ سنويا'
  },
  {
    name: 'ميجا بلس  ٢٣٤٥٨٧-AL',
    company: 'Allianz',
    expired: '٢٠٢٣/١٢/١٣',
    plate_number: 'ب ل / ٢٣٢٣',
    subscribtionFees: '٣٤،٤٥٠ ج/ سنويا'
  },
  {
    name: 'ميجا بلس  ٢٣٤٥٨٧-AL',
    company: 'Allianz',
    expired: '٢٠٢٣/١٢/١٣',
    plate_number: 'ب ل / ٢٣٢٣',
    subscribtionFees: '٣٤،٤٥٠ ج/ سنويا'
  },
  {
    name: 'ميجا بلس  ٢٣٤٥٨٧-AL',
    company: 'Allianz',
    expired: '٢٠٢٣/١٢/١٣',
    plate_number: 'ب ل / ٢٣٢٣',
    subscribtionFees: '٣٤،٤٥٠ ج/ سنويا'
  }
])

const columns = ref([
  {
    header: 'تعريف الوثيقة',
    field: 'name'
  },
  {
    header: 'شركة التأمين',
    field: 'company'
  },
  {
    header: 'صالحة حتى',
    field: 'expired'
  },
  {
    header: 'رقم اللوحة',
    field: 'plate_number'
  },
  {
    header: 'قيمة الإشتراك',
    field: 'subscribtionFees'
  }
])


</script>
