// src/apis/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:6000', // Thay đổi thành URL của backend của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
