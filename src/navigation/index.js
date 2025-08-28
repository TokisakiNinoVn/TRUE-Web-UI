// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/ui/pages/PageHome.vue';
import Login from '@/ui/pages/PageLogin.vue';
import Signup from '@/ui/pages/PageSignup.vue';
import NotFound from '@/ui/pages/PageNotFound.vue';
import AccountView from '@/ui/pages/PageAccountView.vue';
import AddPost from '@/ui/pages/PageAddPost.vue';
import PostDetails from '@/ui/pages/PagePostDetails.vue';
import SearchResults from '@/ui/pages/PageSearchResults.vue';
import PageChat from '@/ui/pages/PageChat.vue';
// import AppMessaging from '@/ui/components/AppMessaging.vue';
import PageBlankMess from '@/ui/pages/PageBlankMess.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/addpost', component: AddPost },
  { path: '/post-details/:id', name: 'PostDetails', component: PostDetails, props: true },
  { path: '/user/:username', name: 'AccountView', component: AccountView, props: true, },

  {
    path: '/search-results',
    name: 'SearchResults',
    component: SearchResults
  },

  { path: '/chat', name: 'PageBlankMess', component: PageBlankMess },
  // { path: '/chat', name: 'PageChat', component: PageChat },
  { path: '/chat/:id', name: 'PageChat', component: PageChat },
  // { path: '/chat/:id', name: 'PageMessaging', component: PageMessaging },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
