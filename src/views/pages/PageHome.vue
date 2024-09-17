<!-- src/views/AppHome.vue -->
<template>
  <AppOwnerHeader />
  <AppHeader />
  <div class="app-home">
    <main class="main-content">
      <AppLatestPosts />
      <AppLowestPricedPosts />
    </main>
  </div>
  <AppFooter />
  <AppToolbar />
</template>

<script setup>
import AppHeader from '@/views/components/AppHeader.vue';
import AppFooter from '@/views/components/AppFooter.vue';
import AppOwnerHeader from '@/views/components/AppOwnerHeader.vue';
import AppToolbar from '@/views/components/AppToolbar.vue';
import AppLatestPosts from '@/views/components/AppLatestPosts.vue';
import AppLowestPricedPosts from '@/views/components/AppLowestPricedPosts.vue';
</script>

<style scoped>
.app-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 100vw;
}

#app {
  margin: 0;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
