<template>
  <div
    class="bg-white fixed w-full z-10 top-0 shadow-nav flex justify-between items-center gap-2 py-2 px-10"
  >
    <div class="flex gap-2 w-100">
      <img class="w-[180px]" src="@/assets/images/myr-logo.svg" alt="" />
    </div>
    <div>
      <Button type="button" class="ml-6" @click="$router.push('/chat')">
        <p class="text-2xl font-bold w-3 h-3 bg-teal-600 rounded-full" v-if="chats"></p>
        <img src="@/assets/images/chat.png" width="35" />
      </Button>
      <Button
        type="button"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      >
        <p class="text-2xl font-bold text-red-500">{{ unread }}</p>
        <img src="@/assets/images/notification.gif" width="40" />
      </Button>
      <Menu
        ref="menu"
        id="overlay_menu"
        class="w-[17rem]"
        :model="items"
        :popup="true"
      >
        <template #start>
          <div class="bg-primary-300 px-2 py-2 text-white rounded-b-xl">
            <h6>Notifications</h6>
          </div>
        </template>
        <template #item="{ item, props }">
          <div
            @click="changeItemStatus(item)"
            :class="[
              'px-2 py-2 cursor-pointer bg-gray-200 border-b',
              { '!bg-white': item.is_read || allSelected.includes(item.id) },
            ]"
          >
            <h5 class="text-lg">{{ item.title }}</h5>
            <p>{{ item.body }}</p>
            <p class="text-sm text-left">
              {{ item.createdAt.substring(0, 10) }}
            </p>
          </div>
        </template>
      </Menu>
    </div>
    <span @click="$emit('openMobileMenu')" class="lg:hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="20"
        height="20"
        viewBox="0 0 48 48"
      >
        <linearGradient
          id="C9TYDZarys49lHDy~k4THa_eofQ1g5BaAx6_gr1"
          x1="12.373"
          x2="34.611"
          y1="-154.373"
          y2="-176.611"
          gradientTransform="matrix(1 0 0 -1 0 -154)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#0077d2"></stop>
          <stop offset="1" stop-color="#0b59a2"></stop>
        </linearGradient>
        <path
          fill="url(#C9TYDZarys49lHDy~k4THa_eofQ1g5BaAx6_gr1)"
          d="M42,15H6c-1.65,0-3-1.35-3-3v0c0-1.65,1.35-3,3-3h36c1.65,0,3,1.35,3,3v0	C45,13.65,43.65,15,42,15z"
        ></path>
        <linearGradient
          id="C9TYDZarys49lHDy~k4THb_eofQ1g5BaAx6_gr2"
          x1="12.373"
          x2="34.611"
          y1="-166.373"
          y2="-188.611"
          gradientTransform="matrix(1 0 0 -1 0 -154)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#0077d2"></stop>
          <stop offset="1" stop-color="#0b59a2"></stop>
        </linearGradient>
        <path
          fill="url(#C9TYDZarys49lHDy~k4THb_eofQ1g5BaAx6_gr2)"
          d="M42,27H6c-1.65,0-3-1.35-3-3v0c0-1.65,1.35-3,3-3h36c1.65,0,3,1.35,3,3v0	C45,25.65,43.65,27,42,27z"
        ></path>
        <linearGradient
          id="C9TYDZarys49lHDy~k4THc_eofQ1g5BaAx6_gr3"
          x1="12.373"
          x2="34.611"
          y1="-178.373"
          y2="-200.611"
          gradientTransform="matrix(1 0 0 -1 0 -154)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#0077d2"></stop>
          <stop offset="1" stop-color="#0b59a2"></stop>
        </linearGradient>
        <path
          fill="url(#C9TYDZarys49lHDy~k4THc_eofQ1g5BaAx6_gr3)"
          d="M42,39H6c-1.65,0-3-1.35-3-3v0c0-1.65,1.35-3,3-3h36c1.65,0,3,1.35,3,3v0	C45,37.65,43.65,39,42,39z"
        ></path>
      </svg>
    </span>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import Menu from "primevue/menu";
import services from "@/services";
import { useRouter } from "vue-router";
import { getMessaging, onMessage } from "firebase/messaging";
import { useStore } from "vuex";

const router = useRouter();
const menu = ref();
const items = ref([]);
const unread = ref("");
const allSelected = ref([]);
const store = useStore();
const chats = computed(() => store.getters["notifications/isNewMessages"]);
function getNotification() {
  services.getNotification().then((res) => {
    items.value = res.data.data;
    unread.value = res.data.data.filter((item) => !item.is_read).length;
  });
}
// function getNotificationUnread() {
//   services.getNotificationUnread().then((res) => {
//     unread.value = res.data.data;
//   });
// }

getNotification();
// getNotificationUnread();
const toggle = (event) => {
  menu.value.toggle(event);
};
async function changeItemStatus(item) {
  //  console.log('item status item status item status => ' ,item);
  if (!item.is_read) {
    item.is_read = true;
    await services.changeItemStatus(item.id);
    unread.value--;
    allSelected.value.push(item.id);
  }
  // remove notification
  if (item.type == "order") {
    router.push({ name: "orders", query: { id: item.target_id } });
  }
  getNotification();
  
}
onMounted(() => {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log("payload", payload);
    items.value = [payload.notification, ...items.value];
  });
});
</script>
<style>
.p-menu-list {
  max-height: 600px !important;
  overflow: auto;
}
</style>
