// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/pages/PageHome.vue';
import Login from '@/views/pages/PageLogin.vue';
import Signup from '@/views/pages/PageSignup.vue';
import NotFound from '@/views/pages/PageNotFound.vue';
import AccountView from '@/views/pages/PageAccountView.vue';
import AddPost from '@/views/pages/PageAddPost.vue';
import PostDetails from '@/views/pages/PagePostDetails.vue';
import SearchResults from '@/views/pages/PageSearchResults.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/addpost', component: AddPost },
  { path: '/post-details/:id', name: 'PostDetails', component: PostDetails, props: true },
  { path: '/user/:username', name: 'AccountView', component: AccountView, props: true, },
  { path: '/search-results', name: 'SearchResults', component: SearchResults },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
