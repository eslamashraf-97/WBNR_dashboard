<template>
  <div :class="['col-span-2 flex-1 rounded-lg overflow-x-auto', {'border': !removeHeader}]">
    <DataTable
        :value="allItems"
        dataKey="id"
        :class="{'removeHeader' : removeHeader}"
    >

      <template #empty>
        <div v-if="loadingTableFromServer">
          <Skeleton height="2rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem" class="mb-2"></Skeleton>
          <Skeleton height="2rem" class="mb-2"></Skeleton>
        </div>
        <p v-else> لا يوجد معلومات </p>
      </template>

      <template #paginatorprevpagelinkicon>
        <div class="flex justify-between gap-2"><i class="fi fi-rr-angle-small-left"></i> Prev</div>
      </template>

      <template #paginatornextpagelinkicon>
        <div class="flex justify-between gap-2">Next <i class="fi fi-rr-angle-small-right"></i></div>
      </template>

      <template #footer v-if="list_url && pagination">
        <div class="md:flex justify-between items-center ">
          <div class="mb-4 md:mb-0 flex items-center gap-3">
            <p class="mb-0 text-sm">Row per page</p>
            <Dropdown :options="[10,25,50,100]" v-model="pagination.take" @change="changeLimit" class="!h-[35px] rounded-md">
              <template v-slot:dropdownicon>
                <img src="@/assets/icons/dropdownIcon.png" />
              </template>
            </Dropdown>
          </div>
          <Paginator
              :rows="pagination.take"
              :totalRecords="pagination.total"
              @page="changePage"
          ></Paginator>
        </div>
      </template>

      <Column v-for="(column, key) in columns" :field="column['field']" :header="column['header']">
        <template #body="slotProps">
          <Skeleton height="2rem" v-if="loadingTableFromServer"></Skeleton>
          <slot v-else :name="column['field']" :data="slotProps.data">
            <p>{{slotProps.data[column['field']]}}</p>
          </slot>
        </template>
      </Column>
      <Column field="actions" :header="''" v-if="showActions" class="">
        <template #body="slotProps">
          <div v-if="!loadingTableFromServer">
            <app-button
                :classContent="actionDots ? 'bg-transparent text-gray-700 text-3xl' : 'bg-secondary-300 text-gray-700 p-2 font-semibold rounded-md'"
                submit-title="Actions"
                @click="toggle($event, allRefs[slotProps.index])"
            >
              <template v-slot:default>
                <span v-if="actionDots" class="text-primary-300 relative">...</span>
                <span v-else class="flex gap-2">
                      Actions <img src="@/assets/icons/dropDownArrow.svg"/>
                  </span>
              </template>
            </app-button>
            <OverlayPanel :ref="el => {allRefs[slotProps.index] = el}" class="p-0 m-0">
              <ul>
                <template v-for="(action, key) in actions" :key="key">
<!--                  v-if="!action.permission || $hasPer(action.permission)"-->
                  <li  class="p-2 font-semibold text-m text-text-200 flex items-center gap-2 transition-all duration-200 hover:px-3 hover:bg-secondary-400 cursor-pointer border-b !px-4"
                      @click="action.action(slotProps.data)"
                  >
                    <i :class="action.icon"></i> {{ action.text }}
                  </li>
                </template>
              </ul>
            </OverlayPanel>
          </div>
          <Skeleton v-else height="2rem"></Skeleton>
        </template>
      </Column>
    </DataTable>
  </div>
</template>
<script setup>
import { ref, watch } from "vue"
import useEmitter from '@/plugins/emitter'
import mainServices from "@/services/index"


const props = defineProps(
    {
      'list_url': {
        type: String,
      },
      removeHeader: {
        type: Boolean,
        default: false
      },
      columns: {
        type: Array,
      },
      showActions: {
        type: Boolean,
        default: true,
      },
      actions: {
        type: Array,
      },
      loadingTable: {
        type: Boolean,
        default: true
      },
      filters: {
        type: Object,
        default: {}
      },
      actionDots: {
        type: Boolean,
        default: false
      },
      list_data: {
        type: Array,
        default: false
      }
    })

const emit = defineEmits(["update:loadingTable"])

const emitter = useEmitter()


const pagination = ref({
  hasNextPage: true,
  hasPreviousPage: false,
  itemsPerPage: 10,
  page: 1,
  pageCount: 2,
  take: 10,
  total: 0
})
const allItems = ref(props.list_data || new Array(pagination.value.total))

const allRefs = ref({})

const loadingTableFromServer = ref(props.list_data ? false : true)
const toggle = (event, ref) => {
  ref.toggle(event);
}

watch(() => props.loadingTable, (val) => {
  if(val) {
    getDataFromServer({page : pagination.value ? pagination.value.page - 1 : 1})
  }
})
watch(() => props.filters, (val) => {
  if(val) {
    getDataFromServer({page :  0})
  }
}, {
  deep: true
})
watch(() => props.list_data, (val) => {
  allItems.value = val
})
function changeLimit(data) {
  allItems.value = new Array(pagination.value.total)
  getDataFromServer({page: 0}, data.value)
}
function getDataFromServer({page = 0 }, limit = 10 ) {
  loadingTableFromServer.value = true
  mainServices.listDataTabl(props['list_url'], {
    page: page ? page + 1 : 1,
    take: limit,
    ...props.filters
  }).then(res => {
    allItems.value = res.data.data
    pagination.value = res.data?.meta
  }).finally(() => {
    loadingTableFromServer.value = false
  })
}

function runComponents () {

  if(props.list_url) {
    getDataFromServer({page: 0})
  }
}
runComponents()
function changePage (data) {
  getDataFromServer({page: data.page })
}

// event when delete successfully
emitter.on("reloadAfterDelete", () => {
  if(props.list_url) {
    getDataFromServer({page: pagination.value ? pagination.value.page - 1 : 1, ...props.filters})
  }
})
</script>

<style>
.removeHeader thead{
  display: none;
}
.p-datatable .p-datatable-footer {
  direction: ltr;
}
</style>
