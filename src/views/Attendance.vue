<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { baseUrl } from '../actions/BaseUrl';

const users = ref([]); // Your data array

async function attendances() {
  try {
    const response = await axios.get(
      `${baseUrl}/facesystem/attendances`
    );
    if (response.status === 200) {
      // Assuming the response contains an array of user objects
      console.log(response.data);

      users.value = response.data;
    } else {
      console.error('Failed to fetch users. Status:', response.status);
    }
  } catch (error) {
    console.error('Error while fetching users:', error);
  }
}



onMounted(() => {
  attendances();
});



</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">Attendance</h3>

    <!-- Inputs -->
    <div class="mt-8">
      <div class="mt-4">
        <div class="flex items-center px-0 py-0 space-x-4 w-full rounded-md">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="w-5 h-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>

            <input
              class="w-32 pl-10 pr-4 border-gray-200 rounded-md sm:w-64"
              type="text"
              placeholder="Search"
            />
            <button
              class="px-5 py-2 ml-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
              style="background-color: #01579b"
            >
              Search
            </button>
            <!-- <button class="px-5 py-2 ml-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500" style="background-color: #01579B;" >
            Filter
          </button> -->
            <div class="relative inline-block"></div>
            <button @click="downloadCSV"
              class="justify-content-end pt-2 px-5 py-2 ml-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
              style="background-color: #01579b"
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8">
      <div class="flex flex-col mt-6">
        <div
          class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <div
            class="inline-block min-w-full overflow-hidden align-middle sm:rounded-lg"
            style="
              border: 2px solid;
              border-color: #01579b;
              box-shadow: 0px 0px 6px #01579b;
            "
          >
            <table  class="min-w-full">
              <thead>
                <tr>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-100 border-b border-gray-200"
                    style="background-color: #01579b"
                  >
                    S/N
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-100 border-b border-gray-200"
                    style="background-color: #01579b"
                  >
                    NAME
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-100 border-b border-gray-200"
                    style="background-color: #01579b"
                  >
                    SIGN IN
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-100 border-b border-gray-200"
                    style="background-color: #01579b"
                  >
                    PANCTUALITY SPECTRUM
                  </th>
                  <th
                    class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-100 border-b border-gray-200"
                    style="background-color: #01579b"
                  >
                    SIGN OUT
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white">
                <tr v-for="(user, index) in users" :key="index">
                  <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                  >
                    <!-- Display serial number -->
                    {{ index + 1 }}
                  </td>
                  <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ user?.user_id?.first_name }}
                    {{ user?.user_id?.last_name }}
                  </td>
                  <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ user?.date }} {{ user?.sign_in_time }}
                  </td>
                  <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ user?.panctuality }}
                  </td>
                  <td
                    class="px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                  >
                    {{ user?.date }} {{ user?.sign_out_time }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
