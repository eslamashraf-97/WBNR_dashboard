<template>
  <div class="border-2 border-gray-200 py-4 rounded-md">
    <img src="@/assets/images/car.svg" class="m-auto"/>
    <div class="flex items-center gap-2 my-3 px-4">
      <img src="@/assets/images/carDocument.svg"/>
      لا توجد وثائق حاليه
    </div>
    <div class="flex justify-center">
      <app-button  class="bg-white border border-primary rounded-lg !text-primary" submit-title="تفاصيل السيارة"/>
    </div>
  </div>
</template>
<script>
import {defineComponent} from "vue";
import AppButton from "@/components/global/AppButton.vue";

export default defineComponent({
  components: {AppButton}
})
</script>
