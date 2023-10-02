<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { baseUrl } from '../actions/BaseUrl';

const totalUsers = ref(0)
const signedin = ref(0)
const signedout = ref(0)
const late = ref(0)
const earlybird = ref(0)

const apiUrl = `${baseUrl}/facesystem/stats`;

async function fetchUserCount() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
       
        totalUsers.value = data.users
        signedin.value = data.reported
        signedout.value = data.signed_out
        late.value = data.late
        earlybird.value = data.on_time
       
        
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    }

   

    onMounted(() => {
      fetchUserCount();
});

</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Dashboard
    </h3>

    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">
        <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
          style="border: 2px solid; border-color: #01579b; box-shadow: 0px 0px 6px #01579b;">
            <div class="p-3 bg-indigo-600 bg-opacity-75 rounded-full" style="background-color: #0277BD;">
              <svg
                class="w-8 h-8 text-white"
                viewBox="0 0 28 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                  fill="currentColor"
                />
                <path
                  d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                  fill="currentColor"
                />
                <path
                  d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                  fill="currentColor"
                />
                <path
                  d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                  fill="currentColor"
                />
                <path
                  d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                  fill="currentColor"
                />
                <path
                  d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700"  id="userCount">
                {{ totalUsers }}
              </h4>
              <div class="text-gray-500">
                Total Users
              </div>
            </div>
          </div>
        </div>

        <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
            style="border: 2px solid; border-color: #01579b; box-shadow: 0px 0px 6px #01579b;" >
            
            <div class="p-3 bg-blue-600 bg-opacity-75 rounded-full" style="background-color: #039BE5 ;">
              <svg class="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 448 512" fill="white"><path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/></svg>

            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ signedin }}
              </h4>
              <div class="text-gray-500">
                Signed In
              </div>
            </div>
          </div>
        </div>

        <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm" 
            style="border: 2px solid; border-color: #01579b; box-shadow: 0px 0px 6px #01579b;">
            <div class="p-3 bg-pink-600 bg-opacity-75 rounded-full" style="background-color: #0277BD;">
              <svg
              class="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              style="fill: white"
            >
              <path
                d="M144 144c0-44.2 35.8-80 80-80c31.9 0 59.4 18.6 72.3 45.7c7.6 16 26.7 22.8 42.6 15.2s22.8-26.7 15.2-42.6C331 33.7 281.5 0 224 0C144.5 0 80 64.5 80 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H144V144z"
              />
            </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ signedout }}
              </h4>
              <div class="text-gray-500">
                Signed Out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <div class="flex flex-wrap -mx-6">

        <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
            style="border: 2px solid; border-color: #01579b; box-shadow: 0px 0px 6px #01579b;">
            <div class="p-3 bg-pink-600 bg-opacity-75 rounded-full" style="background-color: #039BE5;">
              <svg
              class="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 480 512"
              style="fill: white"
            >
              <path
                d="M313.2 47.5c1.2-13 21.3-14 36.6-8.7.9.3 26.2 9.7 19 15.2-27.9-7.4-56.4 18.2-55.6-6.5zm-201 6.9c30.7-8.1 62 20 61.1-7.1-1.3-14.2-23.4-15.3-40.2-9.6-1 .3-28.7 10.5-20.9 16.7zM319.4 160c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm-159.7 0c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16-7.2-16-16-16zm318.5 163.2c-9.9 24-40.7 11-63.9-1.2-13.5 69.1-58.1 111.4-126.3 124.2.3.9-2-.1 24 1 33.6 1.4 63.8-3.1 97.4-8-19.8-13.8-11.4-37.1-9.8-38.1 1.4-.9 14.7 1.7 21.6 11.5 8.6-12.5 28.4-14.8 30.2-13.6 1.6 1.1 6.6 20.9-6.9 34.6 4.7-.9 8.2-1.6 9.8-2.1 2.6-.8 17.7 11.3 3.1 13.3-14.3 2.3-22.6 5.1-47.1 10.8-45.9 10.7-85.9 11.8-117.7 12.8l1 11.6c3.8 18.1-23.4 24.3-27.6 6.2.8 17.9-27.1 21.8-28.4-1l-.5 5.3c-.7 18.4-28.4 17.9-28.3-.6-7.5 13.5-28.1 6.8-26.4-8.5l1.2-12.4c-36.7.9-59.7 3.1-61.8 3.1-20.9 0-20.9-31.6 0-31.6 2.4 0 27.7 1.3 63.2 2.8-61.1-15.5-103.7-55-114.9-118.2-25 12.8-57.5 26.8-68.2.8-10.5-25.4 21.5-42.6 66.8-73.4.7-6.6 1.6-13.3 2.7-19.8-14.4-19.6-11.6-36.3-16.1-60.4-16.8 2.4-23.2-9.1-23.6-23.1.3-7.3 2.1-14.9 2.4-15.4 1.1-1.8 10.1-2 12.7-2.6 6-31.7 50.6-33.2 90.9-34.5 19.7-21.8 45.2-41.5 80.9-48.3C203.3 29 215.2 8.5 216.2 8c1.7-.8 21.2 4.3 26.3 23.2 5.2-8.8 18.3-11.4 19.6-10.7 1.1.6 6.4 15-4.9 25.9 40.3 3.5 72.2 24.7 96 50.7 36.1 1.5 71.8 5.9 77.1 34 2.7.6 11.6.8 12.7 2.6.3.5 2.1 8.1 2.4 15.4-.5 13.9-6.8 25.4-23.6 23.1-3.2 17.3-2.7 32.9-8.7 47.7 2.4 11.7 4 23.8 4.8 36.4 37 25.4 70.3 42.5 60.3 66.9zM207.4 159.9c.9-44-37.9-42.2-78.6-40.3-21.7 1-38.9 1.9-45.5 13.9-11.4 20.9 5.9 92.9 23.2 101.2 9.8 4.7 73.4 7.9 86.3-7.1 8.2-9.4 15-49.4 14.6-67.7zm52 58.3c-4.3-12.4-6-30.1-15.3-32.7-2-.5-9-.5-11 0-10 2.8-10.8 22.1-17 37.2 15.4 0 19.3 9.7 23.7 9.7 4.3 0 6.3-11.3 19.6-14.2zm135.7-84.7c-6.6-12.1-24.8-12.9-46.5-13.9-40.2-1.9-78.2-3.8-77.3 40.3-.5 18.3 5 58.3 13.2 67.8 13 14.9 76.6 11.8 86.3 7.1 15.8-7.6 36.5-78.9 24.3-101.3z"
              />
            </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ earlybird }}
              </h4>
              <div class="text-gray-500">
                Early Birds
              </div>
            </div>
          </div>
        </div>

        <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
          <div
            class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
            style="border: 2px solid; border-color: #01579b; box-shadow: 0px 0px 6px #01579b;">
            <div class="p-3 bg-pink-600 bg-opacity-75 rounded-full" style="background-color: #0277BD;">
              <svg
              class="w-8 h-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
            
              viewBox="0 0 512 512"
              style="fill: white"
            >
              <path
                d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
              />
            </svg>
            </div>

            <div class="mx-5">
              <h4 class="text-2xl font-semibold text-gray-700">
                {{ late }}
              </h4>
              <div class="text-gray-500">
               Late
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>

    <div class="mt-8" />

    <!-- <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div
          class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
          style="border: 2px solid; border-color: #01579b; box-shadow: 0px 0px 6px #01579b;">
      
graph to be displayed here
       
       
        </div>
      </div>
    </div> -->
  </div>
</template>
