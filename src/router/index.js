// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/AppHome.vue';
import Login from '../pages/AppLogin.vue';
import Signup from '../pages/AppSignup.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
