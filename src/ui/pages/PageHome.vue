<!-- src/views/CHome.vue -->
<template>
  <COwnerHeader />
  <CHeader />
  <div class="app-home">
    <main class="main-content">
      <CLatestPosts />
      <CLowestPricedPosts />
    </main>
  </div>
  <CFooter />
  <CToolbar />
</template>

<script setup>
import CHeader from '@/ui/components/CHeader.vue';
import CFooter from '@/ui/components/CFooter.vue';
import COwnerHeader from '@/ui/components/COwnerHeader.vue';
import CToolbar from '@/ui/components/CToolbar.vue';
import CLatestPosts from '@/ui/components/CLatestPosts.vue';
import CLowestPricedPosts from '@/ui/components/CLowestPricedPosts.vue';
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
