<template>
  <Box class="mb-4">
    <ul class="flex gap-4 menu">
      <li>
        <router-link class="inline-block w-[100px] text-center py-1" exact :to="{name: 'employee'}" >
          الموظفيين
        </router-link>
      </li>
      <li>
        <router-link class="inline-block w-[100px] text-center py-1" exact :to="{name: 'roles'}" >
          الادوار
        </router-link>
      </li>
    </ul>
  </Box>
  <router-view />
</template>

<script setup>

</script>

<style>
.menu {}
</style>
