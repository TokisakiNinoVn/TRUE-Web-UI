// conversation.store.js

import { defineStore } from 'pinia';
import {
  createConversationApi,
  getMessagesApi,
  deleteConversationApi,
  searchConversationByUsernameApi,
  getConversationsForUserLoginApi
} from '@/apis/modules/conversation.api';

export const useConversationStore = defineStore('conversation', {
  state: () => ({
    conversations: [], 
    messages: [], 
    isLoading: false,
    error: null,
  }),
  actions: {
    // Action to create a new conversation
    async createConversationActions(payload) {
      this.isLoading = true;
      try {
        const response = await createConversationApi(payload);
        if (response?.status === 201) {
          // Push new conversation to the state
          this.conversations.push(response.data.newConversation);
        }
        return response?.data || [];
      } catch (err) {
        this.error = 'Error creating conversation';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    // Action to get messages for a specific conversation
    async getMessagesActions(conversationId, username) {
      this.isLoading = true;
      try {
        // Gọi API với phương thức POST và truyền dữ liệu body
        const response = await getMessagesApi(conversationId, { conversationId, username });
        this.messages = response.data;
        return response?.data || [];
      } catch (err) {
        this.error = 'Error fetching messages';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },    

    // Action to delete a conversation for the current user
    async deleteConversationActions(conversationId, body) {
      this.isLoading = true;
      try {
        const response = await deleteConversationApi(conversationId, body);
        if (response?.status === 200) {
          // Remove the deleted conversation from the state
          this.conversations = this.conversations.filter(
            convo => convo.conversationId !== conversationId
          );
        }
        return response?.data || [];
      } catch (err) {
        this.error = 'Error deleting conversation';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    // Action to search for conversations by username
    async searchConversationByUsernameActions(payload) {
      this.isLoading = true;
      try {
        const response = await searchConversationByUsernameApi(payload);
        if (response?.status === 200) {
          // Update messages or conversations based on the search
          this.messages = response.data.messages;
        }
        return response?.data || [];
      } catch (err) {
        this.error = 'Error searching for conversations';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    // Action to retrieve conversations for the logged-in user
    async getConversationsForUserLoginActions(userLogin) {
      this.isLoading = true;
      this.error = null;
      try {
        const { data = {} } = await getConversationsForUserLoginApi({ userLogin }) || {};
        this.conversations = data.data || []; // Gán mảng data vào state conversations
        return this.conversations; // Trả về mảng conversations
      } catch (err) {
        this.error = 'Error retrieving conversations';
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    }
    
  }
});
