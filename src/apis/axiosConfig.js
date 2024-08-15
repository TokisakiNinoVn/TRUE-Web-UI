// src/apis/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:6000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export default instance;
