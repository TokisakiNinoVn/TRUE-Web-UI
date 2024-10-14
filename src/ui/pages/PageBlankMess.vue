<!-- PageChat.vue -->
<template>
    <COwnerHeader />
    <CHeader />
    <main class="flex">
        <CConversations />
        <CMessaging />
    </main>
    <CFooter />
    <CToolbar />
</template>
  
<script setup>
import CHeader from '@/ui/components/CHeader.vue';
import CFooter from '@/ui/components/CFooter.vue';
import COwnerHeader from '@/ui/components/COwnerHeader.vue';
import CToolbar from '@/ui/components/CToolbar.vue';
import CConversations from '@/ui/components/CConversations.vue';
import CMessaging from '@/ui/components/CMessaging.vue';
</script>
  
<style scoped>
    main {
        min-height: 100vh;
    }
    
    input:focus {
        outline: none;
    }

</style>
  