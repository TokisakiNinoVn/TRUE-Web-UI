// src/store/modules/auth.store.js
import { defineStore } from 'pinia';
import { login, register } from '@/apis/modules/auth.api';
// import { useRouter } from 'vue-router';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || '',
  }),

  actions: {
    async loginUser(credentials) {
      try {
        const response = await login(credentials);
        const { token, data } = response.data;

        localStorage.setItem('token', token);
        this.token = token;
        this.user = data;
        const loginInfor = data;
        localStorage.setItem('loginInfor', JSON.stringify(loginInfor));
        localStorage.setItem('isLoggedIn', 'true');

        return response?.data || []

      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Đăng nhập thất bại!' };
      }
    },

    async signupUser(credentials) {
      try {
        const response = await register(credentials);
        return response?.data;
      } catch (error) {
        return { success: false, message: error.response?.data?.message || 'Đăng ký thất bại!' };
      }
    },
    
    async logoutUser() {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      localStorage.removeItem("inforAccount");
      localStorage.removeItem("loginInfor");
      localStorage.setItem('isLoggedIn', 'false');
      this.accessToken = undefined;
      alert("Đăng xuất thành công!")
      setTimeout(() => {
        this.$router.push("/");
      }, 3000);
    },
  },
});
