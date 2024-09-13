<!-- src/components/Header.vue -->
<template>
  <header class="header">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>

        <!-- Hiển thị nút Login và Signup nếu chưa đăng nhập -->
        <li v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/signup">Signup</router-link>
        </li>

        <!-- Hiển thị thông tin tài khoản nếu đã đăng nhập -->
        <li v-if="isLoggedIn">
          <router-link :to="`/user/${userInfor.username}`">
            <span>{{ userInfor.username }}</span>
            <img :src="baseURL + userInfor.avatar.imageUrl" alt="avatar" class="avatar">
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AppHeader',
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
        avatar: parsedAccount.userInfor.avatar || { imageUrl: '/default-avatar.png' } // Nếu không có avatar, sử dụng ảnh mặc định
      };
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.header {
  background-color: #333;
  color: #fff;
  padding: 10px 0;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
}

nav ul li {
  margin: 0 15px;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
}
</style>
