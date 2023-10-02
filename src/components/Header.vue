<script setup lang="ts">
import { ref } from 'vue'
import { useSidebar } from '../composables/useSidebar'
import { useStore } from 'vuex';

const dropdownOpen = ref(false)
const { isOpen } = useSidebar()
const open = ref(false);

const store = useStore();


async function logout() {
   // Dispatch the login action with email and password
   await store.dispatch('logout');
   window.location.reload()
}


</script>

<template>
  <header
    class="flex items-center justify-between px-6 py-4 bg-white"  style="background-color: #e1f5fe; border-color: #01579B;"
  >
    <div class="flex items-center">
      <button
        class="text-gray-500 focus:outline-none lg:hidden"
        @click="isOpen = true"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"

        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="#01579B" 
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

    </div>

    <div class="flex items-center">
      <div class="relative">
        <button
          class="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
          @click="dropdownOpen = !dropdownOpen"
        >
          <img
            class="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80"
            alt="Your avatar"
          >
        </button>

        <div
          v-show="dropdownOpen"
          class="fixed inset-0 z-10 w-full h-full"
          @click="dropdownOpen = false"
        />

        <transition
          enter-active-class="transition duration-150 ease-out transform"
          enter-from-class="scale-95 opacity-0"
          enter-to-class="scale-100 opacity-100"
          leave-active-class="transition duration-150 ease-in transform"
          leave-from-class="scale-100 opacity-100"
          leave-to-class="scale-95 opacity-0"
        >
          <div
            v-show="dropdownOpen"
            class="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
          >
        
        
        <div>
          <button class="px-5 py-2 mt-3 font-medium tracking-wide rounded-md flex items-center focus:outline-none" @click="open = true">
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="#01579B" class="mr-2"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
    <span>Profile</span>
</button>

    <div class="line-gradient"></div>
    <button
      class="px-5 py-2 mt-2  font-medium tracking-wide  rounded-md  flex items-center focus:outline-none" 
   @click="logout" >
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#01579B"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg>
    <span style="padding: 1.2px; margin-left: 3px;">Log Out</span>
    </button>
      
    

    <div
  :class="`modal ${
    !open && 'opacity-0 pointer-events-none'
  } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
>
  <div
    class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
    @click="open = false"
  />

  <div class="z-50 w-full mx-auto overflow-y-auto bg-white rounded shadow-lg modal-container md:max-w-md">
    <!-- Add margin if you want to see some of the overlay behind the modal -->
    <div class="px-6 py-4 text-left">
      <!-- Title -->
      <div class="flex items-center justify-between pb-3">
        <p class="text-2xl font-bold">Update Profile</p>
        <div class="z-50 cursor-pointer modal-close" @click="open = false">
        <svg
                class="text-black fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                />
              </svg>
              </div>
      </div>

      <form enctype="multipart/form-data">
        <div class="mb-4">
          <div class="relative w-52 h-56 border-dashed border-2 border-gray-300 rounded-lg"></div>
          <div class="absolute bottom-0 inset-x-0 p-4">
            <input type="file" id="file" name="file" class="hidden"    @change="handleFileInputChange"
        ref="fileInput">
          </div>
        </div>
        <button @click="openFileInput"  class="px-5 py-1.5 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500" style="background-color: #01579B;">
          Change Photo
        </button>
      </form>

      <form class="mt-4">
        <!-- <div class="mb-4">
          <div class="mr-6">
            <label for="fname" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input type="text" id="uname" name="uname" class="border rounded w-full py-2 px-3">
          </div>
        </div> -->

        <div class="mb-4">
          <div class="mr-6">
            <label for="uname" class="block text-gray-700 text-sm font-bold mb-2">Old Password</label>
            <input type="password" id="uname" name="uname" class="border rounded w-full py-2 px-3">
          </div>
        </div>
        <div>
          <div class="mr-6">
            <label for="uname" class="block text-gray-700 text-sm font-bold mb-2">New Password</label>
            <input type="password" id="uname" name="uname" class="border rounded w-full py-2 px-3">
          </div>
        </div>
      </form>

      <!-- Footer -->
      <div class="flex justify-end pt-4">
        <button
          class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none" style="color: #01579B;"
          @click="open = false"
        >
          Close
        </button>
        <button
          class="px-6 py-2 h-10 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none" style="background-color: #01579B;"
          @click="open = false"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</div>

    </div>
          </div>
        </transition>
      </div>
    </div>
  </header>
  <div style="height: 0px;">
    <div class="line-gradient1" style="margin-top: 0px;"></div>
  </div>
</template>

<style>
.line-gradient {
  width: 175px;
  height: 3px;
  background: linear-gradient(to bottom, #40C4FF, #01579B);
  margin: 8px;
  opacity: 1;
  overflow: hidden;
  position: relative;
}

.line-gradient::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #40C4FF, #01579B);
  transform: translateX(-100%);
  animation: lineMove 2s linear infinite;
}

@keyframes lineMove {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.line-gradient1 {
  width: 1500px;
  height: 3px;
  background: linear-gradient(to bottom, #40C4FF, #01579B);
  margin: 0px;
  opacity: 1;
  overflow: hidden;
  position: relative;
}


.line-gradient1::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #40C4FF, #01579B);
  transform: translateX(-100%);
  animation: lineMove 4s linear infinite;
}

</style>