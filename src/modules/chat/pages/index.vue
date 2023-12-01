<template>
  <div style="direction: ltr; height: 87vh;">
      <div class="mx-auto h-full bg-primary-100 rounded-lg overflow-hidden shadow-md">
      <!-- Chatting -->
      <div class="flex w-100 h-full flex-row justify-between bg-primary-100">
      <!-- chat list -->
      <div class="flex flex-col h-full w-2/5 border-r border-primary-100 overflow-y-auto bg-white">
        <h5 class="border-b text-center border-primary-200">All User</h5>
        <!-- user list -->
        <div
          class="flex flex-row py-4 px-2 justify-center items-center border-b"
          v-for="(user, key) in allCollections"
          :key="key"
        >
          <!-- <div class="w-1/4">
            <img
              src="https://source.unsplash.com/_7LbC5J-jw4/600x600"
              class="object-cover h-12 w-12 rounded-full"
              alt=""
            />
          </div> -->
          <div class="w-full">
            <div class="text-lg font-semibold">user {{user}}</div>
          </div>
        </div>
        <!-- end user list -->
      </div>

      <!-- end chat list -->
      <!-- message -->
      <div class="w-full px-5 flex flex-col justify-between">
        <div class="flex flex-col mt-5">
          <div class="flex justify-end mb-4">
            <div
              class="mr-2 py-3 px-4 bg-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-primary-300"
            >
              Welcome to group everyone !
            </div>
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
          </div>
          <div class="flex justify-start mb-4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div
              class="ml-2 py-3 px-4 bg-primary-300 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              at praesentium, aut ullam delectus odio error sit rem. Architecto
              nulla doloribus laborum illo rem enim dolor odio saepe,
              consequatur quas?
            </div>
          </div>
        </div>
        <div class="py-5">
          <input
            class="w-full bg-white p-3 text-primary-300 outline-none rounded-xl"
            type="text"
            placeholder="type your message here..."
          />
        </div>
      </div>

      </div>
      </div>
  </div>
</template>
<script setup>
import {ref, onMounted} from "vue";
import firebaseServices from "../services/firebase.services";
// import useFirebase from '../compasables/useFirebase'

const allCollections = ref([])
// const {fetchAllChat,allChats} = useFirebase()
onMounted(()=>{
  firebaseServices.getAllCollections().then(res => {
    allCollections.value = res.data.data
  })
  // fetchAllChat(19)
})
</script>
