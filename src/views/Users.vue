<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import swal from 'sweetalert';
import { baseUrl } from '../actions/BaseUrl';


const open = ref(false);
const crazy = ref(false);
// const edit = ref(false);

const selectedUser = ref(null); 
const selectedUserEmail = ref('');
const fname = ref('')
const lname = ref('')
const email = ref('')
const phone = ref('')
const position = ref('')
const signature = ref('')
const gender = ref('')
const efname = ref(null)
const elname = ref('')
const eemail = ref('')
const ephone = ref('')
const eposition = ref('')
const esignature = ref('')
const egender = ref('')
const users = ref([]);
const addingFace = ref(false);
const user_details = ref('');

async function sendScanRequest() {
 addingFace.value = true;
    
      try {

        // Append the selected user's email to the URL
        const scanUrl = `${baseUrl}/facesystem/trigger/${selectedUser.value.username}`;

        const response = await axios.get(scanUrl);
        if (response.status === 200) {
          // Handle the successful response here
          console.log('Scan request successful:', response.data);
        } else {
          console.error('Scan request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error sending scan request:', error);
      }
    addingFace.value = false; 
  }

async function fetchUsers() {
  try {
    const response = await axios.get(`${baseUrl}/facesystem/Users`);
    if (response.status === 200) {
      // Assuming the response contains an array of user objects
      console.log(response);
      
      users.value = response.data;
    } else {
      console.error('Failed to fetch users. Status:', response.status);
    }
  } catch (error) {
    console.error('Error while fetching users:', error);
  }
}

async function submit() {
  try {
  const requestBody = {
  first_name : fname.value,
  last_name : lname.value,
  email : email.value,
  phone_number : phone.value,
  gender : gender.value,
  position : position.value,
  username : signature.value
};

    axios.post(`${baseUrl}/facesystem/register`, requestBody)
    .then(response =>
    {
      if (response.data.save === true) {
        window.location.reload()
      }
    } )
    .catch(error => {
      console.error("There was an error!", error);
    });
  }catch (error) {
    // Handle error
    console.error(error);
  }
}

const edit = ref(false);

const editedUser = ref({
  user_id:null,
  first_name : efname.value,
  last_name : elname.value,
  email : eemail.value,
  phone_number : ephone.value,
  gender : egender.value,
  position : eposition.value,
  username : esignature.value
    });

    const openEditModal = (user:any) => {
      console.log(user);
      
      editedUser.value = { ...user }; // Clone the user data
      edit.value = true;
    };
    const closeEditModal = () => {
      edit.value = false;
    };
const edit_user = async () => { 
  edit.value = true
  const requestBody = {
  first_name : efname.value,
  last_name : elname.value,
  email : eemail.value,
  phone_number : ephone.value,
  gender : egender.value,
  position : eposition.value,
  username : esignature.value
};


  const url = `${baseUrl}/facesystem/edit-user-details/${editedUser.value.user_id}`;
  console.log(url);
  
    try{
      
swal({  
      title: "",  
    text: "Are you sure you want to Edit this user?",  
    icon: "warning",  
    buttons: ["Cancel", "Edit"],   
      showCancelButton: true,  
      confirmButtonClass: "danger",  
      confirmButtonText: " Confirm, remove it!",  
      closeOnConfirm: false  
    }
    ).then( async (willdelete) => {
      if (willdelete) {
        const response = await axios.post(
   url , editedUser.value
    );
    if (response.status === 200) {
      // Assuming the response contains an array of user objects
      console.log(response.data);

      window.location.reload()
    } else {
      console.error('Failed to fetch users. Status:', response.status);
    }
      } else {
        return
      }
    
  
    //delete
  })

  } catch (error) {
    console.error('Error while fetching users:', error);
  }
  }


const delete_user = async (username:any) => {
  const scanUrl = `${baseUrl}/facesystem/delete-user/${username}`;
  console.log(scanUrl);
  
try{
  const token = localStorage.getItem("token");
  const headers = {
  'Authorization': `Bearer ${token}`
}

swal({  
      title: "",  
    text: "Are you sure you want to delete this user?",  
    icon: "warning",  
    buttons: ["Cancel", "Delete"],   
      showCancelButton: true,  
      confirmButtonClass: "danger",  
      confirmButtonText: " Confirm, remove it!",  
      closeOnConfirm: false  
    }
    ).then( async (willdelete) => {
      if (willdelete) {
        const response = await axios.get(
      scanUrl,
       {headers:headers}
    );
    if (response.status === 200) {
      // Assuming the response contains an array of user objects
      console.log(response.data);

      window.location.reload()
    } else {
      console.error('Failed to fetch users. Status:', response.status);
    }
      } else {
        return
      }
    
  
    //delete
  })

  } catch (error) {
    console.error('Error while fetching users:', error);
  }
}

onMounted(() => {
  fetchUsers();
});



</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Users
    </h3>
    <button
      class="px-5 py-2 mt-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none" style="background-color: #01579B;"
      @click="open = true"
    >
      Add User
    </button>
    <button
      class="px-5 py-2 mt-3 ml-3 font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none" style="background-color: #01579B;"
      @click="crazy = true"
    >
      Detect Face
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

      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded-xl  modal-container md:max-w-md"
        style="border: 2px solid; border-color: #01579b; box-shadow: 0px 0px 6px #01579b;">
      

        <!-- Add margin if you want to see some of the overlay behind the modal -->
        <div class="px-6 py-4 text-left modal-content">
          <!-- Title -->
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">
              Registration Form
            </p>
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
             
          <!-- Form -->
    <form>
        <!-- Input 1 -->
        <div class="mb-4">
            <label for="fname" class="block text-gray-700 text-sm font-bold mb-2">First Name</label>
            <input type="text" id="fname"  v-model="fname" class="border rounded w-full py-2 px-3">
        </div>

        <!-- Input 3 -->
        <div class="mb-4">
            <label for="lname" class="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
            <input type="text" id="lname" v-model="lname" class="border rounded w-full py-2 px-3">
        </div>

        <!-- Input 4 -->
        <div class="mb-4">
            <label for="Email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="text" id="email" v-model="email" class="border rounded w-full py-2 px-3">
        </div>

        <!-- Input 2 -->
        <div class="mb-4">
            <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
            <input type="tel" id="phone" v-model="phone" class="border rounded w-full py-2 px-3">
        </div>

        <!-- Input 5 -->
        <div class="mb-4">
            <label for="position" class="block text-gray-700 text-sm font-bold mb-2">Position</label>
            <input type="text" id="position" v-model="position" class="border rounded w-full py-2 px-3">
        </div>

        
        <!-- Input 6 -->
        <div class="mb-4">
            <label for="signature" class="block text-gray-700 text-sm font-bold mb-2">Signature</label>
            <input type="text" id="signature" v-model="signature" class="border rounded w-full py-2 px-3">
        </div>

        <p class="text-gray-700 text-sm font-bold mb-2">Gender</p>
            <label class="inline-flex items-center">
                <input type="radio" v-model="gender" value="M" class="form-radio text-indigo-600">
                <span class="ml-2">Male</span>
            </label>
            <label class="inline-flex items-center ml-6">
                <input type="radio" v-model="gender" value="F" class="form-radio text-indigo-600">
                <span class="ml-2">Female</span>
            </label>
    </form>


          <!-- Footer -->
          <div class="flex justify-end pt-2">
            <button
              class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none" style="color: #01579B;"
              @click="open = false"
            >
              Close
            </button>
            <button
              class="px-6 py-2  font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none" style="background-color: #01579B;"
              @click="submit"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- detect face -->
    <div
      :class="`modal ${
        !crazy && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
        @click="crazy = false"
      />

      <div
        class="rounded-xl z-50 w-11/12 mx-auto overflow-y-auto  bg-white modal-container md:max-w-md"
        style="border: 2px solid; border-color: #01579b; box-shadow: 0px 0px 6px #01579b;">
      

        <!-- Add margin if you want to see some of the overlay behind the modal -->
        <div class="px-6 py-4 text-left modal-content">
          <!-- Title -->
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">
             Detect Face
            </p>
            <div class="z-50 cursor-pointer modal-close" @click="crazy = false">
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
             
          <!-- Form -->
          <div >
            
    <select id="userSelect" v-model="selectedUser" class="rounded px-2">
      <option :value="null">Select a user</option>
      <option v-for="user in users" :key="user.id" :value="user">{{ user.email }}</option>
    </select>

        <button id="choosebtn" style="background-color: #01579B;"   @click="sendScanRequest">Choose</button>
       
        <div class="ml-5 mt-4 flex items-center">
    <!-- Rectangle -->
    <div class="rounded-xl w-80 h-80 mr-4 relative"  style="box-shadow: 0px 0px 6px #01579b; border: 2px solid; border-color: #01579B;">
      <!-- Circle inside the rectangle -->
      <div class="w-60 h-60  rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style="background-color: #01579B;">
        <div class="w-40 h-40 ml-11 mt-10">
  <template v-if="addingFace">
    <div class="loading-container">
    <video class="rounded-xl mr-2" autoplay loop muted playsinline poster="placeholder-image.jpg">
  <source  src="../assets/animation_lmiwg4h1.mp4" type="video/mp4">
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
</div>


          <!-- Footer -->
          <div class="flex justify-end pt-2">
            <button
              class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none" style="color: #01579B;"
              @click="crazy = false"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!--view -->
    <div
      :class="`modal ${
        !edit && 'opacity-0 pointer-events-none'
      } z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center`"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50 modal-overlay"
        @click="edit = false"
      />

      <div
        class="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded-xl  modal-container md:max-w-md"
        style="border: 2px solid; border-color: #01579b; box-shadow: 0px 0px 6px #01579b;">
      

        <!-- Add margin if you want to see some of the overlay behind the modal -->
        <div class="px-6 py-4 text-left modal-content">
          <!-- Title -->
          <div class="flex items-center justify-between pb-3">
            <p class="text-2xl font-bold">
              User Details
            </p>
            <div class="z-50 cursor-pointer modal-close" @click="edit = false">
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
             
          <!-- Form -->
    <form >
        <!-- Input 1 -->
        <div class="mb-4">
            <label for="fname" class="block text-gray-700 text-sm font-bold mb-2">First Name</label>
            <input type="text" id="fname"  v-model="editedUser.first_name"  class="border rounded w-full py-2 px-3">
        </div>

        <!-- Input 3 -->
        <div class="mb-4">
            <label for="lname" class="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
            <input type="text" id="lname" v-model="editedUser.last_name" class="border rounded w-full py-2 px-3">
        </div>

        <!-- Input 4 -->
        <div class="mb-4">
            <label for="Email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="text" id="email" v-model="editedUser.email"  class="border rounded w-full py-2 px-3">
        </div>

        <!-- Input 2 -->
        <div class="mb-4">
            <label for="phone" class="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
            <input type="tel" id="phone" v-model="editedUser.phone_number"  class="border rounded w-full py-2 px-3">
        </div>

        <!-- Input 5 -->
        <div class="mb-4">
            <label for="position" class="block text-gray-700 text-sm font-bold mb-2">Position</label>
            <input type="text" id="position" v-model="editedUser.position" class="border rounded w-full py-2 px-3">
        </div>

        
        <!-- Input 6 -->
        <div class="mb-4">
            <label for="signature" class="block text-gray-700 text-sm font-bold mb-2">Signature</label>
            <input type="text" id="signature" v-model="editedUser.username" class="border rounded w-full py-2 px-3">
        </div>

        <p class="text-gray-700 text-sm font-bold mb-2">Gender</p>
            <label class="inline-flex items-center">
                <input type="radio" v-model="egender" value="M" class="form-radio text-indigo-600">
                <span class="ml-2">Male</span>
            </label>
            <label class="inline-flex items-center ml-6">
                <input type="radio" v-model="egender" value="F" class="form-radio text-indigo-600">
                <span class="ml-2">Female</span>
            </label>
           
    </form>


          <!-- Footer -->
          <div class="flex justify-end pt-2">
            <button
              class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none" style="color: #01579B;"
              @click="edit = false"
            >
              Close
            </button>
            <button
              class="px-6 py-2  font-medium tracking-wide text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none" style="background-color: #01579B;"
              @click="edit_user"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>

    

<div class="mt-8">

<div class="flex flex-col mt-6">
  <div
    class="py-2 -my-2 overflow-x-auto sm:-mx- sm:px-6 lg:-mx-8 lg:px-8"
  >
    <div
      class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg"
    style="border: 2px solid; border-color: #01579b; box-shadow: 0px 0px 6px #01579b;">
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-white text-gray-500 uppercase bg-gray-100 border-b border-gray-200"
              style="background-color: #01579B;" >
              S/N
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-100 border-b border-gray-200"
              style="background-color: #01579B;">
              NAME
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-100 border-b border-gray-200"
              style="background-color: #01579B;">
              GENDER
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-100 border-b border-gray-200"
              style="background-color: #01579B;" >
              EMAIL
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-100 border-b border-gray-200"
              style="background-color: #01579B;" >
              PHONE
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-100 border-b border-gray-200"
              style="background-color: #01579B;" >
              POSITION
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-100 border-b border-gray-200"
              style="background-color: #01579B;" >
              SIGNATURE
            </th>
            <th
              class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-white uppercase bg-gray-100 border-b border-gray-200"
              style="background-color: #01579B;" >
              ACTION
            </th>
          </tr>
        </thead>

        <tbody class="bg-white">
         <tr v-for="(user, index) in users" :key="index">
          <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            <!-- Display serial number -->
            {{ index + 1 }}
          </td>
          <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            {{ user?.first_name }} {{ user?.last_name }}
          </td>
          <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            {{ user?.gender == "F"? "Female":"Male"}}
          </td>
          <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            {{ user?.email }}
          </td>
          <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            {{ user?.phone_number }}
          </td>
          <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            {{ user?.position }}
          </td>
          <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            {{ user?.username }}
          </td>
          <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
            <!-- Add any action buttons here -->
            <!-- <svg @click="View_user(user.username)" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="green"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg> -->
           <button @click="openEditModal(user)">
            <svg style="margin-top: -17px;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="#01579B"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
           </button>
            <button @click="delete_user(user?.username)">
              <svg  class="px-10" style="margin-top: -17px;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="red"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
            </button>
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

<style>
.modal {
  transition: opacity 0.25s ease;
}

#choosebtn{
    background-color: #04274b;
    color: white;
    border-radius: 4px;
    width: 120px;
    height: 40px;
    margin-left: 5px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Adjust the height as needed */
}

.loading-image {
  animation: spin 2s linear infinite; /* Apply the spin animation */
  width: 150px; /* Adjust the width as needed */
  height: 150px; /* Adjust the height as needed */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}



</style>
