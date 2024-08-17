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

<script>
import { login } from '@/apis/modules/auth.api';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Gửi thông tin đăng nhập tới API
        const response = await login({ username: this.username, password: this.password });
        
        // Lưu token vào localStorage
        localStorage.setItem('token', response.data.token);
        
        // Thông báo thành công và chuyển hướng
        alert(response.data.message || 'Login successful');
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
        alert('Login failed. Please check your credentials and try again.');
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
