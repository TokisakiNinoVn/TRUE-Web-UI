<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Trang không được tìm thấy</p>
    <router-link to="/">Về trang chủ</router-link>
  </div>
</template>

<script setup>
// Không cần thêm logic trong phần setup
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 50px;
}

h1 {
  font-size: 5rem;
}

p {
  font-size: 1.5rem;
}

a {
  color: #42b983;
}
</style>
