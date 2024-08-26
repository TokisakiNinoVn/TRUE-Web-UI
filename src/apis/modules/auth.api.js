import instance from '@/apis/axiosConfig';

const login = async ({username, password}) => instance.post('/public/auth/login', {username, password});
const register = async ({username, password}) => instance.post('/public/auth/signup', {username, password});

export {
  login,
  register
}


