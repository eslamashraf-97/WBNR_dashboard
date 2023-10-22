<template>
  <div :class="['flex justify-between items-center cursor-pointer ',transition ? 'ease-in duration-100 hover:bg-secondary-200' : '', list.routeName ? 'hover:px-2' : '' ]"
        @click="list.routeName ? $router.push({name: list.routeName}) : ''">
      <div class="flex gap-3 items-center">
        <span :class="['bg-secondary-300 w-12 h-12 flex-center rounded-full', list.bgClass]">
          <img v-if="list.icon" :src="list.icon" />
          <span v-else class="font-semibold text-md"> {{list.title[0]}}{{list.description[0]}}</span>
        </span>
        <div>
            <p class="text-text-500 font-normal text-base">{{ list.title }}</p>
            <p class="text-text-300 font-normal text-sm">{{ list.description }}</p>
        </div>
    </div>
      <div>
          <slot>
<!--              <img src="@/assets/icons/smallArrow.svg" />-->
          </slot>
      </div>
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
      type : Object
  },
  transition: {
    type : Boolean,
    default: false
  }
})
</script>

<style scoped>

</style>
