// src/store/modules/user.js
import { login } from '@/apis/modules/auth.api';

export default {
  namespaced: true,
  state: {
    user: null,
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    CLEAR_USER_DATA(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await login(credentials);
        const { token, data: user } = response.data;
        
        // Save token and user information
        commit('SET_TOKEN', token);
        commit('SET_USER', user);

        return response;
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }) {
      commit('CLEAR_USER_DATA');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    user: (state) => state.user,
  },
};
