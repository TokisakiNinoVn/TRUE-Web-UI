<!-- src/components/Header.vue -->
<template>
  <header class="header">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>

        <li v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/signup">Signup</router-link>
        </li>

        <li v-if="isLoggedIn">
          <router-link :to="`/account/${userInfor.username}`">
            <span>{{ userInfor.fullname }}</span>
            <img :src="userInfor.avatar" alt="avatar" class="avatar">
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isLoggedIn: false,
      userInfor: {},
    };
  },
  mounted() {
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
