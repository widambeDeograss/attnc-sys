<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';


const router = useRouter()
const email = ref('')
const password = ref('')
const store = useStore();


async function login() {
  try {
    // Dispatch the login action with email and password
    await store.dispatch('login', {
      email: email.value,
      password: password.value
    });

    // Check if the user is authenticated
    if (store.getters.isAuthenticated) {
      router.push('/dashboard'); // Redirect to the dashboard on successful login
    } else {
     console.log("login failed");
     
    }
  } catch (error) {
    // Handle error
    console.error(error);
  }
}

</script>

<template>
  <section class="min-h-screen flex items-center justify-center" style="background-color: #e1f5fe;">
    <!-- login container p-5--->
    <div class="animated-border flex rounded-2xl shadow-lg max-w-3xl mb-10 " style="background-color: #e1f5fe; border:2px solid; border-color: #01579b; height: 350px; box-shadow: 0px 0px 6px #01579b;">
      <!-- form px-16-->
      <div class="cont w-1/2 px-4 mt-5">
       <!-- <h2 class="font-bold text-2xl mt-2" style="color: #e1f5fe;">Facial Recognition</h2> -->
       <img  src="../assets/logo1.png" style="width: 100px; margin-left: 100px;">
       <form action="" class="mt-2 flex flex-col gap-4" @submit.prevent="login">
        <label class="block">
            <span class="text-sm text-black">Username</span>
            <input
              v-model="email"
              type="email"
              class="w-80 block py-1.5 rounded-xl border"
              style="border-color: #01579b"
            />
          </label>
          <label class="block">
            <span class="text-sm text-black">Password</span>
            <input
              v-model="password"
              type="password"
              class="w-80 block  rounded-xl border py-1.5"
              style="border-color: #01579b"
            />
          </label>
          <button
              type="submit"
              class="w-80 mt-2 rounded-xl border py-2 px-5 text-white  font-bold hover:scale-105 duration-300"
              style="background-color: #01579b;  border-color: #e1f5fe;">
              LOGIN
            </button>
       </form>
      </div>
      <!-- image try keeping p-5 -->
      <div class="w-3/2">
    <video class="rounded-xl ml-2" autoplay loop muted playsinline poster="placeholder-image.jpg" style="height: 347px; border: 2px solid; border-color: #01579b;">
  <source  src="../assets/animation_lmirhdjh.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
</div>
    </div>
    <div  class="w-full py-2" style="background-color:#01579b; text-align: center; padding: 10px; position: absolute; bottom: 0; left: 0; right: 0;">
        <span style="color: white;">Developed and maintained by eGA</span>
      </div>
  </section>
</template>

<style>
.image-container {
  position: relative;
  overflow: hidden;
}
  
</style>