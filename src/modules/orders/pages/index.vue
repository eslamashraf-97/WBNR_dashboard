<template>
  <Box class="p-5">
    <Dialog v-model:visible="showClientDetails" maximizable  modal :header="'تفاصيل العميل'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="mb-4">
        <span class="inline-block w-[120px] text-gray-500">اسم :</span>
        <span>{{ clientDetails.name }}</span>
      </div>
      <div class="mb-4">
        <span class="inline-block w-[120px] text-gray-500">رقم الهاتف :</span>
        <span>{{ clientDetails.phone }} - {{ clientDetails.secondary_phone }}</span>
      </div>
      <div class="mb-4">
        <span class="inline-block w-[120px] text-gray-500">العنوان :</span>
        <span>{{ clientDetails.address_details }}</span>
      </div>
      <div class="mb-4">
        <span class="inline-block w-[120px] text-gray-500">المتجر :</span>
        <span>{{ clientDetails.store_name }}</span>
      </div>
      <div>
        <span class="inline-block w-[120px] text-gray-500">ملحوظه :</span>
        <span>{{ clientDetails.notes }}</span>
      </div>
    </Dialog>
    <Dialog v-model:visible="showOrderDetail" maximizable  modal :header="'تفاصيل الطلب'" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <main-table :show-actions="false" :loading-table="loadingTable" :list_data="orderDetails.orderItems" :columns="columnsProducts">
        <template v-slot:product="{data}">
          <div class="flex items-center gap-2 py-2 !max-w-max">
            <Avatar :image="data.product.featured_image" size="large" shape="circle" />
            {{data.product.title}}
          </div>
        </template>
        <template v-slot:code="{data}">
          <p>{{data.product.code}}</p>
        </template>
        <template v-slot:third_party_seller_name="{data}">
          <div>
            {{data.product.third_party_seller_name}}
          </div>
        </template>
      </main-table>
      <div class="bg-gray-50 rounded-md my-4 p-3" v-if="orderDetails.statusHistories.length">
        <h5 class="text-lg">الحالات السابقة</h5>
        <p v-for="(i, key) in orderDetails.statusHistories" :key="key" class="mb-2">
          {{status_text[i.status]}} : {{i.reason ? i.reason : 'لا يوجد تعليق'}}
        </p>
      </div>
      <label class="mb-2 text-gray-700 text-lg">اختر الحالة :</label>
      <div class="gap-4 grid grid-cols-4">
        <div :class="['col-span-1 overflow-hidden cursor-pointer']" @click="selected = item" v-for="(item, key) in status" :key="key">
          <div :class="['border w-full text-center py-3 rounded-md', {'bg-primary-200 text-primary-300': selected == item}]">{{ status_text[item] }}</div>
        </div>
      </div>
      <textarea v-model="reason" class="w-full mt-4" placeholder="ملحوظة"></textarea>
      <div class="flex justify-center mt-5">
        <app-button submit-title="حفط التغييرات" :loading="loading" type="button" @click="changeStatus"/>
      </div>
    </Dialog>
    <Dialog v-model:visible="selectOrder" maximizable modal header="إضافه منتج للطلب"  :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <ValidationForm @submit="addItemToOrder" v-slot="{ values }"  :initialValues="details">
      <MainSelect :options="allProducts" name="product_id" optionLabel="title" @change="change" optionValue="id" placeholder="اختر المنتج"/>
      <InputField type="text" validation="required" placeholder="السعر" name="final_price"/>
      <InputField type="text" validation="required" placeholder="الكمية" name="quantity"/>
<!--        {{ filters }}-->
      <div class="sign-up__button-action mt-4">
        <AppButton class="" type="submit" :loading="loadingAddNew" submit-title="حفظ المنتج"></AppButton>
      </div>
      </ValidationForm>
    </Dialog>
    <div class="flex justify-between items-center mb-4 border-b-2 pb-3">
      <h5 class="text-md">الطلبات</h5>
    </div>
    <div class="mb-4">
      <p>تصفية :</p>
      <div class="flex gap-4">
        <input type="text"  placeholder="بحث برقم الطلب" class="filterInput w-full" v-model="filter.order_number" />
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
        <Dropdown
          class="w-full"
          :options="status"
          :inputClass="`max-w-full capitalize h-[47px]`"
          placeholder="اختر الحالة"
          v-model="filter.status"
        >
          <template v-slot:option="data">
            {{status_text[data.option]}}
          </template>
          <template v-slot:value="data">
            {{ data.value? status_text[data.value] : 'اختر الحالة'}}
          </template>
        </Dropdown>
      </div>
    </div>
    <main-table :filters="{...$route.query, ...filter}" :showActions="false" :loading-table="loadingTable" :list_url="'admin/orders'" :columns="columns">
      <template v-slot:orderItems="{data}">
        <p>{{data.orderItems.length}}</p>
      </template>
      <template v-slot:country="{data}">
        <div class="flex items-center gap-2 py-2 w-max">
          <img class="flag" :src="data.country.image">
          <p>{{data.country.name}}</p>
        </div>
      </template>
      <template v-slot:price="{data}">
        <div class="flex items-center gap-2 py-2 max-w-max">
          <p>{{data.price}}</p>
          <span>{{data.country.currency}}</span>
        </div>
      </template>
      <template v-slot:tax_amount="{data}">
        <div class="flex items-center gap-2 py-2">
          <p>{{data.tax_amount}}</p>
          <span>{{data.country.currency}}</span>
        </div>
      </template>
      <template v-slot:delivery_cost="{data}">
        <div class="flex items-center gap-2 py-2">
          <p>{{data.delivery_cost}}</p>
          <span>{{data.country.currency}}</span>
        </div>
      </template>
      <template v-slot:final_price="{data}">
        <div class="flex items-center gap-2 py-2">
          <p>{{data.final_price}}</p>
          <span>{{data.country.currency}}</span>
        </div>
      </template>
      <template v-slot:client="{data}">
        <div class="flex items-center gap-2 py-2">
          <p>{{data.client.name}}</p>
          <span class="text-green-500 cursor-pointer" @click="showDetails(data.client)">(تفاصيل)</span>
        </div>
      </template>
      <template v-slot:customer="{data}">
        <div class="flex items-center gap-2 py-2">
          <p>{{data.customer.name}}</p>
        </div>
      </template>
      <template v-slot:status="{data}">
        <div class="flex items-center gap-2 py-2">
          <p :class="`status--${data.status}`">{{status_text[data.status]}}</p>
        </div>
      </template>
      <template v-slot:changeStatus="{data}">
        <app-button class="border border-primary-300 !text-primary-300 !bg-white" v-if="$hasPer('orders:update')" submit-title="تفاصيل الطلب" @click="showOrderDetails(data)"/>
      </template>
      <template v-slot:addProduct="{data}">
        <app-button class="border border-primary-300 !text-primary-300 !bg-white" v-if="$hasPer('orders:update')" submit-title="اضافه منتج" @click="details = {}; showAdd(data)"/>
      </template>
    </main-table>
  </Box>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from "@/components/global/AppButton.vue";
import Avatar from "primevue/avatar";
import orderServices from "@modules/orders/services/order.services";
import { useCountries } from "../../country/composables";
import productServices from "../../products/services/product.services";


const columns = [
  {
    header: 'رقم الطلب',
    field: 'order_number'
  },
  {
    header: 'العميل',
    field: 'client'
  },
  {
    header: 'المسوق',
    field: 'customer'
  },
  {
    header: 'البلد',
    field: 'country',
    class:'text-center'
  },
  {
    header: 'عدد المنتجات',
    field: 'orderItems'
  },
  {
    header: 'السعر',
    field: 'price'
  },
  {
    header: 'قيمة الضريبة',
    field: 'tax_amount'
  },
  {
    header: 'سعر الشحن',
    field: 'delivery_cost'
  },
  {
    header: 'السعر النهائى',
    field: 'final_price'
  },
  {
    header: 'حالة الأوردر',
    field: 'status'
  },
  {
    header: '',
    field: 'changeStatus'
  },
  {
    header: '',
    field: 'addProduct'
  }
]
const columnsProducts = [
  {
    header: 'كود المنتج',
    field: 'code'
  },
  {
    header: 'اسم المنتج',
    field: 'product'
  },
  {
    header: 'السعر النهائى',
    field: 'final_price'
  },
  {
    header: 'اسم التاجر',
    field: 'third_party_seller_name'
  },
  {
    header: 'العدد',
    field: 'quantity'
  }
]
const filter = ref({
  order_number: null,
  country_id: null,
  status: null
});
const { countries } = useCountries()
const showClientDetails = ref(false)
const showOrderDetail = ref(false)
const clientDetails = ref({})
const orderDetails = ref({})
const selected = ref()
const loading = ref(false)
const reason = ref('')
const loadingTable = ref(false)
const loadingAddNew = ref(false)
const selectOrder = ref(null)
const allProducts = ref([])
const filters = ref({})
const details = ref({})

const status = ['pending', 'confirmed',  'processing', 'cancelled', 'shipping', 'rejected', 'delivered']
const status_text = ref({
  pending: 'قيد الانتظار',
  confirmed: 'تأكيد',
  processing: 'جارى التجهيز ',
  cancelled: 'ملغاه',
  shipping: 'جارى التوصيل',
  rejected: 'مرفوض',
  delivered: 'تم الاستلام'
})
function showDetails(data) {
  showClientDetails.value = true
  clientDetails.value = data
}
function showOrderDetails(data) {
  showOrderDetail.value = true
  orderDetails.value = data
  selected.value = data.status
}
function showAdd(data) {
  selectOrder.value = data.id
}

function change(s) {
  // console.log('aaaaaaaa', s);
  filters.value = {}
  // details.value.final_price = null
  filters.value = allProducts.value.find(data => data.id == s)
  details.value.product_id =  allProducts.value.find(data => data.id == s).id
  details.value.final_price = allProducts.value.find(data => data.id == s).price
}
function changeStatus () {
  loading.value = true
  loadingTable.value = false
  orderServices.changeStatus(orderDetails.value.id, {status: selected.value, reason: reason.value}).then(() => {
    showOrderDetail.value = false
    loadingTable.value = true
  }).finally(() => {
    loading.value = false
  })
}

function getAllProducts () {
  productServices.gitAllProduct().then(res => {
    allProducts.value = res.data.data
  })
}
getAllProducts()
function addItemToOrder (data) {
  loadingAddNew.value = true
  orderServices.addItemToOrder(selectOrder.value, data).then(res => {
    loadingAddNew.value = false
    selectOrder.value = null
  })
}
</script>
