import instance from '@/apis/axiosConfig';

// Tạo cuộc hội thoại mới
const createConversationApi = async (body) => instance.post(`/auth/messages/create`, body);

// Lấy tin nhắn của một cuộc hội thoại dựa trên conversationId
const getMessagesApi = async (id, body) => instance.post(`/auth/messages/${id}`, body);

// Xóa cuộc hội thoại cho một người dùng
const deleteConversationApi = async (id, body) => instance.delete(`/auth/messages/${id}`, { data: body });

// Tìm kiếm cuộc hội thoại dựa trên username
const searchConversationByUsernameApi = async (body) => instance.post(`/auth/messages/search`, body);

// Lấy danh sách các cuộc hội thoại cho người dùng đang đăng nhập
const getConversationsForUserLoginApi = async (body) => instance.post(`/auth/messages/`, body);

export {
    createConversationApi,
    getMessagesApi,
    deleteConversationApi,
    searchConversationByUsernameApi,
    getConversationsForUserLoginApi
};
