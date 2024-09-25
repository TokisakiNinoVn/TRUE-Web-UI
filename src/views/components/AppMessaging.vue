<!-- PageMessaging.vue -->

<template>
  <main>
    <div class="p-6 border-t">
      <h2 class="text-xl font-semibold mb-4">Chat</h2>
      
      <div class="mb-4">
        <div v-for="(message, index) in messages" :key="index" class="mb-2">
          <span class="font-bold">{{ message.sender }}:</span>
          <span>{{ message.content }}</span>
        </div>
      </div>
  
      <div class="flex">
        <input 
          v-model="newMessage" 
          @keyup.enter="sendMessage" 
          type="text" 
          placeholder="Type your message here..." 
          class="flex-1 border rounded-lg p-2 mr-2"
        />
        <button 
          @click="sendMessage" 
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          <ion-icon name="send-outline"></ion-icon>
        </button>
      </div>
      
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMessageStore } from '@/store/message.store';
import { useConversationStore } from '@/store/conversation.store';
import { useRoute } from 'vue-router';

const messageStore = useMessageStore();
const conversationStore = useConversationStore();
const route = useRoute();

const newMessage = ref('');
const error = ref('');
const messages = ref([]);

// Lấy thông tin cuộc hội thoại và tin nhắn
const conversationId = route.params.id;

onMounted(async () => {
  const currentConversation = conversationStore.conversations.find(conv => conv.conversationId === conversationId);
  if (currentConversation) {
    messages.value = currentConversation.messages;
  }
});

// Hàm gửi tin nhắn
const sendMessage = async () => {
  if (!newMessage.value.trim()) {
    error.value = 'Please enter a message.';
    return;
  }

  const messageData = {
    senderUsername: 'your_username', // Thay bằng username thực tế
    recipientUsername: 'recipient_username', // Thay bằng username của người nhận
    content: newMessage.value,
  };

  try {
    await messageStore.sendNewMessageAction(messageData);
    newMessage.value = ''; // Xóa ô input sau khi gửi
    error.value = '';
  } catch (err) {
    error.value = 'Failed to send message.';
  }
};
</script>

<style scoped>
</style>
