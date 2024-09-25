<!-- PageChat.vue -->
<template>
    <AppOwnerHeader />
    <AppHeader />
    <main class="flex">
        <AppConversations />
        <AppMessaging />
    </main>
    <AppFooter />
    <AppToolbar />
</template>
  
<script setup>
import AppHeader from '@/views/components/AppHeader.vue';
import AppFooter from '@/views/components/AppFooter.vue';
import AppOwnerHeader from '@/views/components/AppOwnerHeader.vue';
import AppToolbar from '@/views/components/AppToolbar.vue';
import AppConversations from '@/views/components/AppConversations.vue';
import AppMessaging from '@/views/components/AppMessaging.vue';
</script>
  
<style scoped>
    main {
        min-height: 100vh;
    }
    
    input:focus {
        outline: none;
    }

</style>
  