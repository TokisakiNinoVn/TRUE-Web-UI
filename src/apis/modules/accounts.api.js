import instance from '@/apis/axiosConfig';

const getUserInfo = async (userId) => instance.get(`/public/account/${userId}`);
const updateUser = async (userId) => instance.put(`/auth/accounts/${userId}`);
export {
  getUserInfo,
  updateUser
}
