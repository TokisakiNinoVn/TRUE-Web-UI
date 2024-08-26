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

<script>
import { register } from '@/apis/modules/auth.api';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleSignup() {
      try {
        const response = await register({ username: this.username, password: this.password });
        alert(response.data.message || 'Tạo tài khoản thành công! Vui lòng đăng nhập');
        this.$router.push('/login');
      } catch (error) {
        console.error('Signup failed:', error.response?.data || error.message);
        alert('Signup failed. Please check your details and try again.');
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
