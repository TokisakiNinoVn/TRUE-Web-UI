// message.api.js

import instance from '@/apis/axiosConfig';

// Gửi tin nhắn mới
const sendMessage = async (data) =>  instance.post('/auth/message', data);

// Thu hồi tin nhắn
const revokeMessage = async (data) => instance.put('/auth/message/revoke', data)

export {
  sendMessage,
  revokeMessage,
};
