<template>
  <Box class="p-5">
    <div class="flex justify-between items-center mb-10 border-b-2 pb-3">
      <h5 class="text-md mb-4">عائلتي</h5>
      <app-button submit-title="إضف فرد جديد" class="rounded-lg font-medium !py-3">
        <template v-slot:icon>
          +
        </template>
      </app-button>
    </div>
    <main-table actionDots :list_data="listData" :columns="columns" :actions="actions">
      <template v-slot:name="{data}">
        <div class="flex items-center gap-2 py-2">
          <Avatar :image="personImage" shape="circle" />
          <p><span>اميرة محمد / </span> <span class="text-gray-400"> زوجة</span></p>
        </div>
      </template>
    </main-table>
  </Box>
</template>

<script setup>
import {ref} from "vue";
import AppButton from "@/components/global/AppButton.vue"
import MainTable from "@/components/global/table/MainTable.vue";
import personImage from "@/assets/images/global/person.png";
import Avatar from "primevue/avatar";

const listData = ref([
  {
    name: 'اميرة محمد / زوجة',
    id: '٢٨٩٠٩١٨٦٤٥٣٦٧٥',
    birthdate: '٢٠٢٣/١٢/١٣',
    insurance_car: 'لا يوجد',
    medical_insurance: '١ وثيقة'
  },
  {
    name: 'اميرة محمد / زوجة',
    id: '٢٨٩٠٩١٨٦٤٥٣٦٧٥',
    birthdate: '٢٠٢٣/١٢/١٣',
    insurance_car: 'لا يوجد',
    medical_insurance: '١ وثيقة'
  },
  {
    name: 'اميرة محمد / زوجة',
    id: '٢٨٩٠٩١٨٦٤٥٣٦٧٥',
    birthdate: '٢٠٢٣/١٢/١٣',
    insurance_car: 'لا يوجد',
    medical_insurance: '١ وثيقة'
  },
  {
    name: 'اميرة محمد / زوجة',
    id: '٢٨٩٠٩١٨٦٤٥٣٦٧٥',
    birthdate: '٢٠٢٣/١٢/١٣',
    insurance_car: 'لا يوجد',
    medical_insurance: '١ وثيقة'
  },
  {
    name: 'اميرة محمد / زوجة',
    id: '٢٨٩٠٩١٨٦٤٥٣٦٧٥',
    birthdate: '٢٠٢٣/١٢/١٣',
    insurance_car: 'لا يوجد',
    medical_insurance: '١ وثيقة'
  },
  {
    name: 'اميرة محمد / زوجة',
    id: '٢٨٩٠٩١٨٦٤٥٣٦٧٥',
    birthdate: '٢٠٢٣/١٢/١٣',
    insurance_car: 'لا يوجد',
    medical_insurance: '١ وثيقة'
  },
  {
    name: 'اميرة محمد / زوجة',
    id: '٢٨٩٠٩١٨٦٤٥٣٦٧٥',
    birthdate: '٢٠٢٣/١٢/١٣',
    insurance_car: 'لا يوجد',
    medical_insurance: '١ وثيقة'
  }
])

const columns = ref([
  {
    header: 'إسم العضو وصفته',
    field: 'name'
  },
  {
    header: 'الرقم القومي',
    field: 'id'
  },
  {
    header: 'تاريخ الميلاد',
    field: 'birthdate'
  },
  {
    header: 'تأمين سيارات',
    field: 'insurance_car'
  },
  {
    header: 'تأمين طبي',
    field: 'medical_insurance'
  }
])

const actions = ref([
  {
    text: 'Show',
    icon: 'fi fi-rr-eye'
  },
  {
    text: 'Edit',
    icon: 'fi fi-rr-pencil'
  },
  {
    text: 'Delete',
    icon: 'fi fi-rr-trash'
  }
])
</script>
