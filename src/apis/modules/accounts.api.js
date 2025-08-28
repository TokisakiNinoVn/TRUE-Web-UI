import instance from '@/apis/axiosConfig';

const getUserInfo = async (username) => instance.get(`/public/user/${username}`);
const updateUser = async (userId) => instance.put(`/auth/account/${userId}`);
export {
  getUserInfo,
  updateUser
}
