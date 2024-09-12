<template>
  <div class="signup">
    <h1>Signup</h1>
    <form @submit.prevent="handleSignup">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';

const username = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

// Function xử lý đăng ký
const handleSignup = async () => {
  try {
    const response = await authStore.signupUser({
      username: username.value,
      password: password.value,
    });

    if (response.status == "success") {
      alert(response.message || 'Tạo tài khoản thành công! Vui lòng đăng nhập.');
      router.push('/login');
    }
  } catch (error) {
    console.error('Signup failed:', error);
    alert('Đăng ký thất bại. Vui lòng thử lại.');
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
