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
import { ref } from 'vue'; // Vue 3's reactive state management
// import { useRouter } from 'vue-router'; // For routing
import { useAuthStore } from '@/store/auth.store';
import { useAccountStore } from '@/store/account.store';
import { useRouter } from 'vue-router';

const router = useRouter();
const { getInforAccount } = useAccountStore();
const username = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const authStore = useAuthStore();
    const response = await authStore.loginUser({
      username: username.value,
      password: password.value,
    });

    const storedLoginInfor = JSON.parse(localStorage.getItem('loginInfor'));
    const idUser = storedLoginInfor.id;
    const inforAccount = await getInforAccount(idUser);

    if (!inforAccount) {
      throw new Error('Không thể lấy thông tin tài khoản.');
    }
    if (response.status == "success") {
          alert(response.message);
          router.push('/');
        } else {
          alert(response.message);
        }

    localStorage.setItem('inforAccount', JSON.stringify(inforAccount));
  } catch (error) {
    console.error('Login failed:', error);
    alert('Đã có lỗi xảy ra. Vui lòng thử lại sau!');
  }
};

</script>

<style scoped>
/* Add your styles here */
</style>
