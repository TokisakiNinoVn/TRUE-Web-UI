// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/main.scss';

if (!localStorage.getItem('isLoggedIn')) {
  localStorage.setItem('isLoggedIn', 'false');
}
createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
