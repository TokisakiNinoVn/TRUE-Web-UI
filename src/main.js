// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import store from './state';
import './styles/main.scss';
import './assets/css/main.css';

if (!localStorage.getItem('isLoggedIn')) {
  localStorage.setItem('isLoggedIn', 'false');
}
createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
