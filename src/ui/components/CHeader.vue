<template>
  <header class="bg-gray-800 text-white p-4 flex items-center justify-between sticky top-0 left-0 w-full z-50">
    <!-- App Name -->
    <div class="text-2xl font-bold">
      <router-link to="/" class="text-white hover:text-gray-300">SinhVienChat</router-link>
    </div>
    <nav class="flex items-center space-x-6">
      <!-- Search Bar -->
      <input 
        type="text" 
        placeholder="Tìm kiếm..." 
        class="w-500 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out"
        v-model="searchQuery"
        @keyup.enter="performSearch"
      />

      <!-- Notification Icon -->
      <div class="relative group">
        <ion-icon name="notifications-outline" class="text-2xl cursor-pointer hover:text-gray-300"></ion-icon>
        <!-- Notification Dropdown -->
        <ul class="absolute right-0 hidden group-hover:block bg-gray-700 rounded-lg shadow-lg mt-2 w-64">
          <li class="px-4 py-2 hover:bg-gray-600"><a href="#">Thông báo 1</a></li>
          <li class="px-4 py-2 hover:bg-gray-600"><a href="#">Thông báo 2</a></li>
          <li class="px-4 py-2 hover:bg-gray-600"><a href="#">Thông báo 3</a></li>
        </ul>
      </div>

      <!-- Navigation Links -->
      <ul class="flex space-x-6">
        <li class="flex items-center"><router-link to="/" class="hover:text-gray-300">Trang chủ</router-link></li>
        <li class="flex items-center"><router-link to="/admin-post" class="hover:text-gray-300">Admin Post</router-link></li>
        <li v-if="!isLoggedIn">
          <router-link to="/login" class="hover:text-gray-300">Đăng nhập</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/signup" class="hover:text-gray-300">Đăng ký</router-link>
        </li>
        <li v-if="isLoggedIn" class="relative group">
          <router-link :to="`/user/${userInfor.username}`" class="flex items-center hover:text-gray-300">
            <span class="mr-2">{{ userInfor.username }}</span>
            <img :src="baseURL + userInfor.avatar.imageUrl" alt="avatar" class="w-10 h-10 rounded-full object-cover">
          </router-link>
          <ul class="absolute left-0 hidden group-hover:block bg-gray-700 rounded-lg shadow-lg mt-2">
            <li><router-link :to="`/user/${userInfor.username}`" class="block px-4 py-2 hover:bg-gray-600 flex items-center"><ion-icon name="person-circle-outline" class="mr-2"></ion-icon> Hồ sơ</router-link></li>
            <li><a href="#" @click.prevent="showLogoutConfirm" class="block px-4 py-2 hover:bg-gray-600 flex items-center"><ion-icon name="log-out-outline" class="mr-2"></ion-icon> Đăng xuất</a></li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- Logout Confirmation Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <p class="text-lg mb-4 text-gray-800">Bạn có muốn đăng xuất?</p>
        <div class="flex justify-end space-x-4">
          <button @click="confirmLogout" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-150 ease-in-out">Có</button>
          <button @click="cancelLogout" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-150 ease-in-out">Không</button>
        </div>
      </div>
    </div>
  </header>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const searchQuery = ref('');
const isLoggedIn = ref(false);
const userInfor = ref({});
const baseURL = axios.defaults.baseURL || 'http://localhost:5000';
const showConfirmModal = ref(false);

onMounted(() => {
  const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
  const accountInfo = localStorage.getItem('inforAccount');

  if (loggedInStatus && accountInfo) {
    isLoggedIn.value = true;
    const parsedAccount = JSON.parse(accountInfo);
    userInfor.value = {
      ...parsedAccount.userInfor,
      username: parsedAccount.username,
      avatar: parsedAccount.userInfor.avatar || { imageUrl: '/default-avatar.png' }
    };
  }
});

const logout = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('inforAccount');
  isLoggedIn.value = false;
  userInfor.value = {};
  router.push('/');
};

const showLogoutConfirm = () => {
  showConfirmModal.value = true;
};

const confirmLogout = () => {
  logout();
  showConfirmModal.value = false;
};

const cancelLogout = () => {
  showConfirmModal.value = false;
};

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'SearchResults', query: { query: searchQuery.value.trim() } });
  }
};
</script>

<style scoped>

</style>
