import instance from '@/apis/axiosConfig';

const getUserInfo = async (username) => instance.get(`/public/account/${username}`);
const updateUser = async (userId) => instance.put(`/auth/account/${userId}`);
export {
  getUserInfo,
  updateUser
}
