<template>
  <div style="direction: ltr; height: 87vh">
    <div
      class="mx-auto h-full bg-primary-100 rounded-lg overflow-hidden shadow-md"
    >
      <!-- Chatting -->
      <div class="flex w-100 h-full flex-row justify-between bg-primary-100">
        <!-- chat list -->
        <div
          class="flex flex-col h-full w-2/5 border-r border-primary-100 overflow-y-auto bg-white"
        >
          <h5 class="border-b text-center border-primary-200">All User</h5>
          <!-- user list -->
          <div
            class="flex flex-row justify-center items-center border-b"
            v-for="(user, key) in chats"
            :key="key"
          >
            <button class="w-full" @click="selectChat(user.id)">
              <div :class="['text-lg py-4 px-2  text-left font-semibold', {'border-r-4 border-primary-300 bg-primary-100' : user.id == activeChat }]">{{ user.name }}</div>
            </button>
          </div>
          <!-- end user list -->
        </div>

        <!-- end chat list -->
        <!-- message -->
        <div
          class="w-full flex flex-col justify-between relative"
          v-if="messages.length > 0"
        >
          <div
            class="flex flex-col mt-5 px-5 overflow-y-auto h-full pb-16 scroll-smooth"
            ref="chatbox"
          >
            <div
              class="flex mb-4"
              v-for="m in messages"
              :key="m.id"
              :class="
                m.is_user_message ? 'flex justify-start ' : 'flex justify-end '
              "
            >
              <div
                class="mr-2 py-3 px-4"
                :class="
                  m.is_user_message
                    ? 'rounded-br-xl rounded-tr-xl rounded-tl-xl text-primary-300 bg-white'
                    : 'rounded-bl-xl rounded-tl-xl rounded-tr-xl  text-white bg-primary-300'
                "
              >
                {{ m.message }}
              </div>
            </div>
          </div>

          <div
            class="flex absolute bg-white rounded-xl w-full bottom-0 left-0 shadow-md"
          >
            <input
              class="w-full outline-none px-4 py-3 placeholder-gray-400"
              type="text"
              placeholder="type your message here..."
              v-model="newMessage"
              @keyup.enter="sendMessage"
            />

            <button
              class="px-8 py-3 bg-primary-300 text-white rounded-r-xl"
              @click="sendMessage"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import useChat from "../compasables/useChat";
const activeChat = ref(null)
const { chats, newMessage, messages, getMessages, sendMessage, setActiveChat } =
  useChat();
import { nextTick, ref, watch } from "vue";
const chatbox = ref(null);
watch(
  () => messages,
  () => {
    nextTick(() => {
      chatbox.value.scrollTop = chatbox.value.scrollHeight;
    });
  },
  { immediate: true, deep: true }
);
const selectChat = (user) => {
  setActiveChat(user);
  getMessages();
  activeChat.value = user
};
</script>
