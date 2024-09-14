<!-- src/components/Header.vue -->
<template>
    <nav class="main fixed bottom-10 flex justify-between items-center h-14 shadow-md px-4 w-[400px] mx-auto left-0 right-0 rounded-full">
        <!-- Back lại trang trước đó -->
        <li><ion-icon name="arrow-back-outline" class="text-xl"></ion-icon></li>

        <li><router-link to="/"><ion-icon name="home-outline" class="text-xl"></ion-icon></router-link></li>
        <li class="relative -top-4 bg-blue-500 rounded-full p-4 text-white shadow-lg cursor-pointer">
            <ion-icon name="add-outline" class="text-4xl"></ion-icon>
        </li>

        <li><ion-icon name="arrow-up-outline" class="text-xl cursor-pointer" @click="scrollToTop"></ion-icon></li>
        <li v-if="isLoggedIn">
            <router-link :to="`/user/${userInfor.username}`">
                <ion-icon name="person-circle-outline" class="text-2xl"></ion-icon>
            </router-link>
        </li>
        <li v-else>
            <router-link to="/login">
                <ion-icon name="person-circle-outline" class="text-2xl"></ion-icon>
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
  