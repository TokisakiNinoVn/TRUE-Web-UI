
// message.store.js

import { defineStore } from 'pinia';
import { sendMessage, revokeMessage } from '@/apis/modules/message.api';

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: [],
    conversations: [],
  }),
  actions: {
    async sendNewMessageAction(messageData) {
      try {
        const response = await sendMessage(messageData);
        if (response.data) {
          this.messages.push(response.data.newMessage); // Hoặc xử lý dữ liệu theo cách bạn cần
        }
      } catch (error) {
        console.error("Error sending message:", error);
        throw error; // Có thể xử lý thêm lỗi tại đây
      }
    },

    async revokeMessageAction(conversationId, messageId, senderUsername) {
      try {
        const response = await revokeMessage({ conversationId, messageId, senderUsername });
        if (response.data) {
          // Cập nhật trạng thái tin nhắn trong store
          const messageIndex = this.messages.findIndex(msg => msg.id === messageId);
          if (messageIndex !== -1) {
            this.messages[messageIndex].content = 'Tin nhắn này đã được thu hồi.';
            this.messages[messageIndex].status = 'revoked';
          }
        }
      } catch (error) {
        console.error("Error revoking message:", error);
        throw error; // Có thể xử lý thêm lỗi tại đây
      }
    },
  },
});
