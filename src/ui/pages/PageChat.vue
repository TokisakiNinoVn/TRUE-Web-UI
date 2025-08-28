<template>
  <COwnerHeader />
  <CHeader />
  <main class="flex h-screen">
    <div class="flex-none w-1/3 p-6 border-r border-gray-300 overflow-y-auto">
      <h1 class="text-2xl font-bold mb-4">Conversations</h1>

      <div v-if="!isLoggedIn" class="text-red-500 mb-4">
        You are not logged in. Please log in to view your conversations.
      </div>

      <div v-if="isLoggedIn && isLoading" class="text-blue-500 mb-4">
        Loading conversations...
      </div>

      <div v-if="isLoggedIn && error" class="text-red-500 mb-4">
        {{ error }}
      </div>

      <div v-if="successMessage" class="text-green-500 mb-4">
        {{ successMessage }}
      </div>

      <ul
        v-if="isLoggedIn && !isLoading && conversations.length"
        class="space-y-4"
      >
        <li
          v-for="conversation in conversations"
          :key="conversation.conversationId"
          class="flex items-center border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-200 bg-white"
        >
          <img
            :src="instance.defaults.baseURL + conversation.avatar"
            alt="User Avatar"
            class="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <div class="flex-1">
            <h3 class="text-lg font-semibold">
              {{ conversation.account2Username }}
            </h3>
            <p class="text-gray-600 truncate">
              {{ conversation.lastMessage.content }}
            </p>
            <span class="text-xs text-gray-500">{{
              formatDate(conversation.lastMessage.createdAt)
            }}</span>
          </div>
          <button
            @click="deleteConversation(conversation.conversationId)"
            class="text-red-500 hover:text-red-700"
          >
            <ion-icon name="close-outline"></ion-icon>
          </button>
          <button
            @click="viewConversation(conversation.conversationId)"
            class="ml-4 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            View
          </button>
        </li>
      </ul>

      <div
        v-else-if="isLoggedIn && !isLoading && !conversations.length"
        class="text-gray-500"
      >
        No conversations found.
      </div>
    </div>

    <div class="flex-1 p-6 border-t border-gray-300 overflow-auto bg-gray-50">
      <h2 class="text-xl font-semibold mb-4">Chat</h2>

      <div
        class="mb-4 max-h-[700px] overflow-y-auto bg-white p-4 rounded-lg shadow-md"
      >
        <div
          v-for="message in messagesConversation[0]?.messages"
          :key="message._id"
          class="mb-2"
        >
          <div
            v-if="message.sender === userLogin.username"
            class="flex justify-end"
          >
            <div class="message-revork flex flex-col justify-start">
              <span class="font-bold ml-2">{{ message.sender }}</span>
              <span class="bg-blue-500 text-white p-2 rounded-lg">{{
                message.content
              }}</span>
            </div>
          </div>

          <div v-else class="flex flex-row justify-start">
            <div class="message-revork flex flex-col justify-start">
              <span class="font-bold">{{ message.sender }}</span>
              <span class="bg-gray-300 p-2 rounded-lg">{{
                message.content
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex mt-4">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          placeholder="Type your message here..."
          class="flex-1 border border-gray-300 rounded-lg p-2 mr-2 focus:ring-2 focus:ring-blue-500"
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
  <CFooter />
  <CToolbar />
</template>

<script setup>
import instance from "@/apis/axiosConfig";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useConversationStore } from "@/state/conversation.state";
import CHeader from "@/ui/components/CHeader.vue";
import CFooter from "@/ui/components/CFooter.vue";
import COwnerHeader from "@/ui/components/COwnerHeader.vue";
import CToolbar from "@/ui/components/CToolbar.vue";
// import CConversations from '@/ui/components/CConversations.vue';

// import { ref, onMounted } from 'vue';
import { useMessageStore } from "@/state/message.state";
// import { useConversationStore } from '@/store/conversation.store';
import { useRoute } from "vue-router";

const { getMessagesActions } = useConversationStore();
const messageStore = useMessageStore();
const route = useRoute();
const isLoggedIn = ref(false);
const userLogin = ref(null);

const newMessage = ref("");
const error = ref("");
const messagesConversation = ref([]); // Store messages from the API response

const id = route.params.id;

onMounted(async () => {
  // Get information from localStorage
  const loggedIn = localStorage.getItem("isLoggedIn");
  const loginInfo = localStorage.getItem("loginInfor");

  userLogin.value = JSON.parse(loginInfo);

  if (loggedIn === "true" && loginInfo) {
    isLoggedIn.value = true;
    userLogin.value = JSON.parse(loginInfo);

    // Fetch data from the API
    const response = await getMessagesActions(id, userLogin.value.username);
    messagesConversation.value = response.data || []; // Store messages returned from the API
    console.log("response: ", response.data);
  }

  if (loggedIn === "true" && loginInfo) {
    isLoggedIn.value = true;
    userLogin.value = JSON.parse(loginInfo);

    const response = await getConversationsForUserLoginActions(
      userLogin.value.username
    );
    conversations.value = response;
  }
});

// Function to send a message
const sendMessage = async () => {
  if (!newMessage.value.trim()) {
    error.value = "Please enter a message.";
    return;
  }

  const messageData = {
    senderUsername: userLogin.value.username,
    recipientUsername: "ninocutee",
    content: newMessage.value,
    type: "text",
  };

  try {
    const response = await messageStore.sendNewMessageAction(messageData);
    if (response) {
      messagesConversation.value[0].messages.push(response.data.newMessage);
      newMessage.value = "";
      error.value = "";

      // Reload the page after sending the message
    }
    location.reload();
  } catch (err) {
    error.value = "Failed to send message.";
  }
};

const conversationStore = useConversationStore();
const { getConversationsForUserLoginActions, deleteConversationActions } =
  conversationStore;
// const { } = useMessageStore;

const router = useRouter();
// const isLoggedIn = ref(false);
// const userLogin = ref(null);
const conversations = ref([]);
const successMessage = ref("");

// onMounted(async () => {
//   const loggedIn = localStorage.getItem('isLoggedIn');
//   const loginInfo = localStorage.getItem('loginInfor');

//   if (loggedIn === 'true' && loginInfo) {
//     isLoggedIn.value = true;
//     userLogin.value = JSON.parse(loginInfo);

//     const response = await getConversationsForUserLoginActions(userLogin.value.username);
//     conversations.value = response;
//   }
// });

// const viewConversation = async (conversationId) => {
//   router.push(`/chat/${conversationId}`);
// };
const viewConversation = async (conversationId) => {
  await router.push(`/chat/${conversationId}`);
  router.go(0); // Reload lại trang
};

const deleteConversation = async (conversationId) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete this conversation?"
  );
  if (confirmDelete) {
    const body = {
      conversationId,
      username: userLogin.value.username,
    };

    await deleteConversationActions(conversationId, body);
    conversations.value = conversations.value.filter(
      (convo) => convo.conversationId !== conversationId
    );

    successMessage.value = "Conversation deleted successfully!";

    setTimeout(() => {
      successMessage.value = "";
    }, 3000);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};
</script>

<style scoped>
main {
  min-height: 100vh;
}

input:focus {
  outline: none;
}
input:focus,
.textarea-comment:focus {
  outline: none;
}
</style>
