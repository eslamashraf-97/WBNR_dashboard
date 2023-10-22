<template>
  <div class="w-full h-[100vh] flex justify-center items-center">
    <div class="text-center">
      <img src="@/assets/images/global/404.svg" class="w-52 mx-auto" alt="404" />
      <h1 class="font-bold mt-4 text-[60px]">Page Not Found</h1>
      <p class="mt-4 text-gray-400">Something went wrong, The page you’re looking for might <br> be removed or is temporally unavailable</p>
      <app-button
          classContent="bg-text-500 text-white p-2 px-8 font-semibold rounded-md mt-4"
          submit-title="Go Back"
          @click="$router.go(-1)"
      >
      </app-button>
    </div>
  </div>
</template>
