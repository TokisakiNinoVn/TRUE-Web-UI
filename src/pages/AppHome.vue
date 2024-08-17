<!-- src/views/AppHome.vue -->
<template>
    <div class="app-home">
      <Header />
      <main class="main-content">
        <img alt="Vue logo" src="../assets/logo.png">
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from '@/components/AppHeader.vue';
  import Footer from '@/components/AppFooter.vue';
  
  export default {
    name: 'AppHome',
    components: {
      Header,
      Footer,
    },
  };
  </script>
  
  <style scoped>
  .app-home {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
  }
  </style>
  