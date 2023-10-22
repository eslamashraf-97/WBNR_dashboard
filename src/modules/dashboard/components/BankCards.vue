<template>
  <Box>
    <div class="p-3">
      <h5 class="text-md mb-4">كارت بنكي</h5>
      <div class="flex justify-center">
        <img src="@/assets/images/credit_card_mockup.png"/>
      </div>
      <div class="flex justify-center">
        <app-button class="bg-transparent bg-lightGray-2 w-full rounded-md text-md !font-bold !text-dark" submit-title="إضافة كارت">
          <template v-slot:icon>
            <div class="bg-primary rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M6.70234 7H3.46484M6.70234 3.5V7V3.5ZM6.70234 7V10.5V7ZM6.70234 7H9.93984H6.70234Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </template>
        </app-button>
      </div>
    </div>
  </Box>
</template>

<script setup>
import AppButton from "@/components/global/AppButton.vue";
</script>

<style scoped>

</style>
