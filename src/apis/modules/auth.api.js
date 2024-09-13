import instance from '@/apis/axiosConfig';

const login = async ({username, password}) => instance.post('/public/auth/login', {username, password});
const register = async ({username, password}) => instance.post('/public/auth/signup', {username, password});
const logout = async (username) => instance.post('/auth/logout', username);

export {
  login,
  register,
  logout
}


