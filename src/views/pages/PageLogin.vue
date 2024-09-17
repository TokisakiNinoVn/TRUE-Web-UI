<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-3xl font-bold mb-8 text-center text-gray-900">Đăng nhập</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-6">
          <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Tên đăng nhập:</label>
          <input v-model="username" type="text" id="username" required 
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out" />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Mật khẩu:</label>
          <input v-model="password" type="password" id="password" required 
                 class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out" />
        </div>
        <button type="submit" 
                class="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
          Đăng nhập
        </button>
      </form>
      <p class="mt-6 text-center text-gray-600">Nếu chưa có tài khoản hãy 
        <router-link to="/signup" class="text-indigo-600 hover:underline">Đăng ký</router-link>
      </p>
      <p class="mt-4 text-center">
        <router-link to="/" class="text-indigo-600 hover:underline flex items-center justify-center">
          Trang chủ
          <ion-icon name="planet-outline" class="ml-2"></ion-icon>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';
import { useAccountStore } from '@/store/account.store';

const route = useRoute();
const router = useRouter();
const { getInforAccount } = useAccountStore();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const accountData = ref({});

// Fetch account information on mounted
onMounted(() => {
  const storedAccountInfo = localStorage.getItem('inforAccount');
  if (storedAccountInfo) {
    const parsedAccount = JSON.parse(storedAccountInfo);
    if (parsedAccount.username === route.params.username) {
      accountData.value = parsedAccount;
    }
  }
});

// Handle the login process
const handleLogin = async () => {
  try {
    const response = await authStore.loginUser({
      username: username.value,
      password: password.value,
    });

    if (response.status === 'success') {
      const storedLoginInfo = JSON.parse(localStorage.getItem('loginInfor'));
      const usernameAccount = storedLoginInfo.username;
      const inforAccount = await getInforAccount(usernameAccount);
      localStorage.setItem('inforAccount', JSON.stringify(inforAccount));

      alert(response.message);
      router.push('/');
    } else {
      alert(response.message);
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert('Đã có lỗi xảy ra. Vui lòng thử lại sau!');
  }
};
</script>

<style scoped>
/* Add custom styles here */
</style>
