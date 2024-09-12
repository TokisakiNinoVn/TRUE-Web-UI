<!-- src/components/Header.vue -->
<template>
    <header class="header">
    <ul>
        <li><router-link to="/account/like">Likes</router-link></li>
        <li>
            <router-link :to="`/account/${userInfor.username}`">Hồ sơ cá nhân</router-link>
        </li>
    </ul>
    </header>
  </template>
  
  <script>
  export default {
    name: 'AppNavAccount',
    data() {
      return {
        isLoggedIn: false,
        userInfor: {},
      };
    },
    mounted() {
      // Kiểm tra trạng thái đăng nhập từ localStorage
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const accountInfo = localStorage.getItem('inforAccount');
      
      if (isLoggedIn && accountInfo) {
        this.isLoggedIn = true;
        const parsedAccount = JSON.parse(accountInfo);
        this.userInfor = {
          ...parsedAccount.userInfor,
          username: parsedAccount.username 
        };
      }
    },
  };
  </script>
  
  <style scoped>
  .header {
    background-color: #333;
    color: #fff;
    padding: 10px 0;
  }
  
   ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    margin: 0;
    padding: 0;
  }
  
   ul li {
    margin: 0 15px;
  }
  
   ul li a {
    color: #fff;
    text-decoration: none;
  }
  </style>
  