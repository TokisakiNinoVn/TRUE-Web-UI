// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/pages/AppHome.vue';
import Login from '@/views/pages/AppLogin.vue';
import Signup from '@/views/pages/AppSignup.vue';
import NotFound from '@/views/pages/NotFound.vue';
import AccountView from '@/views/pages/AccountView.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/user/:username', name: 'AccountView', component: AccountView, props: true, },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
