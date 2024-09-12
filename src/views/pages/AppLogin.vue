<!-- src/views/AccountView.vue -->
<template>
  <div class="account">
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const username = route.params.username;

const accountData = ref({});

onMounted(() => {
  const accountInfo = localStorage.getItem('inforAccount');
  console.log(">> accountInfo", accountInfo);
  
  if (accountInfo) {
    const parsedAccount = JSON.parse(accountInfo);
    if (parsedAccount.username === username) {
      accountData.value = parsedAccount;
    }
  }
});
</script>

<style scoped>
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
