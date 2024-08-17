// src/apis/modules/auth.js
import axios from '../axiosConfig';

export const login = (credentials) => {
  return axios.post('/public/auth/login', credentials);
};

export const register = (userInfo) => {
  return axios.post('/public/auth/signup', userInfo);
};
