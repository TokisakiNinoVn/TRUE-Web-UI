<!-- src/views/AppHome.vue -->
<template>
    <div class="app-home">
      <AppHeader />
      <main class="main-content">
        <!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
      </main>
      <AppFooter />
    </div>
  </template>
  
  <script>
  import AppHeader from '@/views/components/AppHeader.vue';
  import AppFooter from '@/views/components/AppFooter.vue';
  
  export default {
    name: 'AppHome',
    components: {
      AppHeader,
      AppFooter,
    },
  };
  </script>
  
  <style scoped>
  .app-home {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  #app {
    margin: 0;
  }
  
  .main-content {
    flex: 1;
    padding: 20px;
  }
  </style>
  