<template>
  <Box>
    <div class="flex justify-between items-center flex-wrap">
      <AvatarGroup>
        <Avatar :image="personImage" size="large" shape="circle" />
        <Avatar :image="personImage" size="large" shape="circle" />
        <Avatar :image="personImage" size="large" shape="circle" />
        <Avatar :image="personImage" size="large" shape="circle" />
        <Avatar :image="personImage" size="large" shape="circle" />
        <Avatar label="+" shape="circle" size="large" class="cursor-pointer" style="background-color: #2196F3; color: #ffffff"/>
      </AvatarGroup>
      <div class="flex gap-5 items-center">
        <p class="text-gray-secondary font-medium text-base">إجمالي المدفوعات العائلية  4,987 جنيه / شهريا</p>
        <app-button class="bg-transparent px-6  border rounded-xl !border-primary !text-primary" submit-title="التفاصيل"/>
      </div>
    </div>
  </Box>
</template>

<script setup>
import personImage from "@/assets/images/global/person.png";
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
</script>

<style scoped>

</style>
