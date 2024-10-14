<template>
    <nav class="fixed bottom-4 left-0 right-0 mx-auto w-[400px] h-16 flex justify-between items-center px-4 rounded-full bg-white shadow-lg border border-gray-200">
      <!-- Back Button -->
      <li>
        <ion-icon 
          name="arrow-back-outline" 
          class="text-2xl text-gray-600 hover:text-gray-800 cursor-pointer transition duration-150 ease-in-out"
          @click="goBack"
        ></ion-icon>
      </li>
  
      <li>
        <ion-icon 
          name="search-outline" 
          class="text-2xl text-gray-600 hover:text-gray-800 cursor-pointer transition duration-150 ease-in-out"
          @click="goBack"
        ></ion-icon>
      </li>
  
      <!-- Home Button -->
      <li>
        <router-link to="/">
          <ion-icon name="home-outline" class="text-2xl text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out"></ion-icon>
        </router-link>
      </li>
  
      <!-- Add Post Button / Login Button -->
      <li class="relative flex items-center justify-center">
        <router-link :to="isLoggedIn ? '/addpost' : '/login'" class="flex items-center justify-center">
          <ion-icon 
            name="add-outline" 
            class="text-4xl text-white bg-blue-500 rounded-full p-3 shadow-lg hover:bg-blue-600 transition duration-150 ease-in-out"
          ></ion-icon>
        </router-link>
      </li>
  
      <!-- Scroll to Top Button -->
      <li>
        <ion-icon 
          name="arrow-up-outline" 
          class="text-2xl text-gray-600 hover:text-gray-800 cursor-pointer transition duration-150 ease-in-out"
          @click="scrollToTop"
        ></ion-icon>
      </li>
  
      <!-- User Profile Button / Login Button -->
      <li>
        <router-link :to="isLoggedIn ? `/user/${userInfor.username}` : '/login'">
          <ion-icon 
            name="person-circle-outline" 
            class="text-2xl text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out"
          ></ion-icon>
        </router-link>
      </li>
      <!-- User Profile Button / Login Button -->
      <li>
        <router-link :to="isLoggedIn ? '/chat' : '/login'">
          <ion-icon 
            name="chatbubble-ellipses-outline" 
            class="text-2xl text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out"
          ></ion-icon>
        </router-link>
      </li>
    </nav>
  </template>
  

<script>
import axios from 'axios';

export default {
    name: 'AppToolbar',
    data() {
      return {
        isLoggedIn: false,
        userInfor: {},
        baseURL: axios.baseURL || 'http://localhost:5000',
      };
    },
    mounted() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const accountInfo = localStorage.getItem('inforAccount');
      
      if (isLoggedIn && accountInfo) {
        this.isLoggedIn = true;
        const parsedAccount = JSON.parse(accountInfo);

        // Gán thông tin người dùng từ localStorage
        this.userInfor = {
          ...parsedAccount.userInfor,
          username: parsedAccount.username,
        };
      }
    },
    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      goBack() {
        this.$router.go(-1); // Go back to the previous page
      }
    }
};
</script>

<style scoped>
nav.main {
    background-color: antiquewhite;
    display: flex;
    align-items: center;
}
nav.main li {
    display: flex;
    align-items: center;
}
li {
    list-style: none;
}
</style>
