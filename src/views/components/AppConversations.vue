
<!-- AppConversations.vue -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Conversations</h1>

    <div v-if="!isLoggedIn" class="text-red-500 mb-4">
      You are not logged in. Please log in to view your conversations.
    </div>

    <div v-if="isLoggedIn && isLoading" class="text-blue-500 mb-4">Loading conversations...</div>

    <div v-if="isLoggedIn && error" class="text-red-500 mb-4">{{ error }}</div>

    <div v-if="successMessage" class="text-green-500 mb-4">{{ successMessage }}</div>

    <ul v-if="isLoggedIn && !isLoading && conversations.length" class="space-y-4">
      <li v-for="conversation in conversations" :key="conversation.conversationId" class="flex items-center border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-200">
        <img :src="instance.defaults.baseURL + conversation.avatar" alt="User Avatar" class="w-12 h-12 rounded-full mr-4 object-cover">
        <div class="flex-1">
          <h3 class="text-lg font-semibold">{{ conversation.account2Username }}</h3>
          <p class="text-gray-600 truncate">{{ conversation.lastMessage.content }}</p>
          <span class="text-xs text-gray-500">{{ formatDate(conversation.lastMessage.createdAt) }}</span>
        </div>
        <button @click="deleteConversation(conversation.conversationId)" class="text-red-500 hover:text-red-700">
          <ion-icon name="close-outline"></ion-icon>
        </button>
        <button @click="viewConversation(conversation.conversationId)" class="ml-4 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200">
          View
        </button>
      </li>
    </ul>


    <div v-else-if="isLoggedIn && !isLoading && !conversations.length" class="text-gray-500">
      No conversations found.
    </div>
  </div>
</template>

<script setup>
import instance from '@/apis/axiosConfig';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useConversationStore } from '@/store/conversation.store';
// import { useMessageStore } from '@/store/message.store';

const conversationStore = useConversationStore();
const { getConversationsForUserLoginActions, deleteConversationActions } = conversationStore;
// const { } = useMessageStore;

const router = useRouter();
const isLoggedIn = ref(false);
const userLogin = ref(null);
const conversations = ref([]);
const successMessage = ref('');

onMounted(async () => {
  const loggedIn = localStorage.getItem('isLoggedIn');
  const loginInfo = localStorage.getItem('loginInfor');

  if (loggedIn === 'true' && loginInfo) {
    isLoggedIn.value = true;
    userLogin.value = JSON.parse(loginInfo);

    const response = await getConversationsForUserLoginActions(userLogin.value.username);
    conversations.value = response;
  }
});

// const viewConversation = async (conversationId) => {
//   router.push(`/chat/${conversationId}`);
// };
const viewConversation = async (conversationId) => {
  await router.push(`/chat/${conversationId}`);
  router.go(0);
};


const deleteConversation = async (conversationId) => {
  const confirmDelete = confirm('Are you sure you want to delete this conversation?');
  if (confirmDelete) {
    const body = {
      conversationId,
      username: userLogin.value.username,
    };

    await deleteConversationActions(conversationId, body);
    conversations.value = conversations.value.filter(convo => convo.conversationId !== conversationId);
    
    successMessage.value = 'Conversation deleted successfully!';
    
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date);
};
</script>

<style scoped>
</style>
