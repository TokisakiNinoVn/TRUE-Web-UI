<!-- src/views/AppLogin.vue -->
<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
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
