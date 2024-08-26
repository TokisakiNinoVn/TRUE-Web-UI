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
import md5 from 'md5';

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
        const hashedPassword = md5(this.password);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', this.username);
        localStorage.setItem('password', hashedPassword);
        
        // alert(response.data.message || 'Đăng nhập thành công, chào mừng '+ this.username + ' trở lại!^^');
        alert('Đăng nhập thành công, chào mừng '+ this.username + ' trở lại!^^');
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
