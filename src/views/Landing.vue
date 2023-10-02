<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'
import swal from 'sweetalert';
import { baseUrl } from '../actions/BaseUrl';


const open = ref(false);
const crazy = ref(false);
const addingFace = ref(false)

async function signin() {
  addingFace.value = true;
  try {

    // Append the selected user's email to the URL
    const scanUrl = `${baseUrl}/facesystem/sign-in`;

    const response:any = await axios.post(scanUrl);
    if (response.status === 200) {
      console.log(response);
      
      // Handle the successful response here
      swal({
        title: "Sign In status",
        text: response?.data?.message,
        icon: "success",
      })
    } else {
      swal("Face not recognized");
    }
  } catch (error:any) {
    console.error('Error sending scan request:', error);
       // Handle the successful response here
       swal({
        title: "Sign In status",
        text: error,
        icon: "danger",
      })
  }
  addingFace.value = false;
}

async function signout() {
  addingFace.value = true;
  try {

    // Append the selected user's email to the URL
    const scanUrl = `${baseUrl}/facesystem/sign-out`;

    const response:any = await axios.post(scanUrl);
    if (response.status === 200) {
      console.log(response);
      // Handle the successful response here
      swal({
        title: response?.data?.message,
        text: response?.data?.message,
        icon: "success",
      })
    } else {
      swal("Face not recognized");
    }
  } catch (error:any) {
    console.error('Error sending scan request:', error);
    swal({
        title: "Sign Out status",
        text: error,
        icon: "danger",
        dangerMode:true
      })
  }
  addingFace.value = false;
}
</script>


<template>
  <div class="h-screen px-6" style="background-color: #e1f5fe;">
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <img src="../assets/logo2.webp" style="width: 80px; height: 80px; margin-top: 10px;">
      <img src="../assets/logo1.png" style="width: 110px; height: 75px; margin-top: 10px;">
    </div>
    <!-- <div style="display: flex; align-items: center; justify-content: center;">
    <h1 style="font-size: 100px;">e-FACE</h1>
    </div> -->
    <div class="mt-20 flex justify-center items-center">
      <button @click="open = true">
        <div>
          <img src="../assets/unlock.png" style="width: 350px; height: 380px; margin-top: -15px;">
          <img class="image" src="../assets/click.png"
            style="margin-top: -145px; width: 100px; height: 100px; margin-left: 120px;">
          <span class="flex justify-center items-center font-bold" style="color: #01579B; margin-top:55px;">SIGN IN</span>
        </div>
      </button>
      <div :class="`modal ${!open && 'opacity-0 pointer-events-none'
        } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`">
        <div class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay" @click="open = false" />
        <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded-xl shadow-lg modal-container md:max-w-md"
          style="border: 2px solid; border-color: #01579B; box-shadow: 0px 0px 6px #01579B;">
          <div class="px-6 py-4 text-left modal-content">
            <!-- Title -->
            <div class="flex items-center justify-between pb-3">
              <p class="text-2xl font-bold">
                Scan your face
              </p>
              <div class="z-50 cursor-pointer modal-close" @click="open = false">
                <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                  viewBox="0 0 18 18">
                  <path
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                </svg>
              </div>

            </div>
            <div class="ml-5 mt-4 flex items-center">
              <!-- Rectangle -->
              <div class="rectangle w-80 h-80 bg-gray-200 rounded-xl ml-4 relative" style="height: 500px;">
                <!-- Circle inside the rectangle -->
                <div class="w-60 h-60  rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style="background-color: #01579B;">
                  <div class="w-40 h-40 ml-11 mt-10">
                    <!-- <img src="../assets/face.png"> -->
                    <template v-if="addingFace">
                      <div class="loading-container">
                        <video class="rounded-xl mr-2" autoplay loop muted playsinline poster="placeholder-image.jpg">
                          <source src="../assets/animation_lmj5slka.mp4" type="video/mp4">
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </template>

                    <template v-else>
                      <!-- Display the image when addingFace is false -->
                      <img src="../assets/face.png" alt="Face" />
                    </template>
                  </div>

                </div>
              </div>
            </div>
            <!-- Footer -->
            <div class="flex justify-end pt-2">
              <button
                class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
                style="color: #01579B;" @click="open = false">
                Close
              </button>
              <button
                class="px-6 py-2  font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
                style="background-color: #01579B;" @click="signin">
                Scan
              </button>
            </div>
          </div>
        </div>
      </div>
      <div :class="`modal ${!crazy && 'opacity-0 pointer-events-none'
        } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`">
        <div class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay" @click="crazy = false" />
        <div class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded-xl shadow-lg modal-container md:max-w-md"
          style="border: 2px solid; border-color: #01579B; box-shadow: 0px 0px 6px #01579B;">
          <div class="px-6 py-4 text-left modal-content">
            <!-- Title -->
            <div class="flex items-center justify-between pb-3">
              <p class="text-2xl font-bold">
                Scan your face
              </p>
              <div class="z-50 cursor-pointer modal-close" @click="crazy = false">
                <svg class="text-black fill-current" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                  viewBox="0 0 18 18">
                  <path
                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                </svg>
              </div>

            </div>
            <div class="ml-5 mt-4 flex items-center">
              <!-- Rectangle -->
              <div class="rectangle w-80 h-80 bg-gray-200 rounded-xl ml-4 relative" style="height: 500px;">
                <!-- Circle inside the rectangle -->
                <div class="w-60 h-60  rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style="background-color: #01579B;">
                  <div class="w-40 h-40 ml-11 mt-10">
                    <!-- <img src="../assets/face.png"> -->
                    <template v-if="addingFace">
                      <div class="loading-container">
                        <video class="rounded-xl mr-2" autoplay loop muted playsinline poster="placeholder-image.jpg">
                          <source src="../assets/animation_lmj5slka.mp4" type="video/mp4">
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </template>

                    <template v-else>
                      <!-- Display the image when addingFace is false -->
                      <img src="../assets/face.png" alt="Face" />
                    </template>
                  </div>

                </div>
              </div>
            </div>
            <!-- Footer -->
            <div class="flex justify-end pt-2">
              <button
                class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
                style="color: #01579B;" @click="crazy = false">
                Close
              </button>
              <button
                class="px-6 py-2  font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none"
                style="background-color: #01579B;" @click="signout">
                Scan
              </button>
            </div>
          </div>
        </div>
      </div>
      <button @click="crazy = true">
        <div>
          <img src="../assets/lock.png" style="width: 350px; height: 350px; margin-top:15px;">
          <img class="image" src="../assets/click.png"
            style="margin-top: -140px; width: 100px; height: 100px; margin-left: 120px;">
          <span class="flex justify-center items-center  font-bold" style="color: #01579B; margin-top:50px;">SIGN
            OUT</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style>
.rectangle {
  border: 5px solid transparent;
  border-image: linear-gradient(45deg, #01579B, #40C4FF);
  animation: animateBorder 3s linear infinite;
  border-image-slice: 1;
}

@keyframes animateBorder {
  0% {
    border-image-source: linear-gradient(100deg, #01579B, #40C4FF);

  }

  100% {
    border-image-source: linear-gradient(100deg, #40C4FF, #01579B);

  }
}

.image {
  animation: pulse 1s infinite;
  /* You can adjust the duration (2s) and other properties as needed */
  margin-top: -140px;
  width: 100px;
  height: 100px;
  margin-left: 120px;
}




@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>

      
