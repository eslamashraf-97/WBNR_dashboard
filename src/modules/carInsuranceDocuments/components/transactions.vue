<template>
  <box class="!p-0">
    <TabView>
      <TabPanel header="سجل المدفوعات">
        <main-table remove-header :columns="fields" :list_data="list" :show-actions="false">
          <template v-slot:name>
            <payment-card>
              <template v-slot:image>
                <img src="@/assets/images/dashboard/icon.png" />
              </template>
              <template v-slot:left>
                <span></span>
              </template>
            </payment-card>
          </template>
          <template v-slot:status="{data}">
            <span class="text-success font-medium">{{data.status}}</span>
          </template>
          <template v-slot:price="{data}">
            <span class="font-semibold">{{data.price}}</span>
          </template>
          <template v-slot:details="{data}">
            <app-button submit-title="التفاصيل" class="bg-white !text-gray-500 border border-gray-500 rounded-lg"/>
          </template>
        </main-table>
        <p class="text-primary font-semibold text-center py-4"> رؤية السجل</p>
      </TabPanel>
      <TabPanel header="المعاملات على الوثائق">
        <main-table remove-header :columns="fields" :list_data="list" :show-actions="false">
          <template v-slot:name>
            <payment-card>
              <template v-slot:image>
                <img src="@/assets/images/dashboard/icon.png" />
              </template>
              <template v-slot:left>
                <span></span>
              </template>
            </payment-card>
          </template>
          <template v-slot:status="{data}">
            <span class="text-success font-semibold">{{data.status}}</span>
          </template>
          <template v-slot:price="{data}">
            <span class="font-semibold">{{data.price}}</span>
          </template>
          <template v-slot:details="{data}">
            <app-button submit-title="التفاصيل" class="bg-white !text-gray-500 border border-gray-500 rounded-lg"/>
          </template>
        </main-table>
        <p class="text-primary font-semibold text-center py-4"> رؤية السجل</p>
      </TabPanel>
    </TabView>
  </box>
</template>

<script setup>
import { ref } from "vue";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import MainTable from "@/components/global/table/MainTable.vue";
import PaymentCard from "@/components/global/cards/paymentCard.vue";
import AppButton from "@/components/global/AppButton.vue";

const fields = ref([
  {
    field: 'name',
    header: 'Name',
  },
  {
    field: 'status',
    header: 'status',
  },
  {
    field: 'price',
    header: 'price',
  },
  {
    field: 'details',
    header: 'details',
  }
])
const list = ref([{name: 'ads', status: 'ناجحة', price: '$557', details: 'sa'}, {name: 'ads', status: 'ناجحة', price: '$557', details: 'sa'}])
</script>

<style scoped>

</style>
