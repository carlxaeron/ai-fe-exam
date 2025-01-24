import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import store from '../store';
import Media from '@/views/admin/Media.vue';

// Import your views/components here

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { type: 'login' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Dashboard,
    meta: { type: 'admin' }
  },
  {
    path: '/admin/media',
    name: 'Media',
    component: Media,
    meta: { type: 'admin' }
  }
];

const router = createRouter({
  // history: createWebHistory(process.env.VUE_APP_BASE_PATH || '/'),
  history: createWebHashHistory(process.env.VUE_APP_BASE_PATH || '/'),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.type === 'admin') {
    const user = store.getters.getCurrentUser;
    if (!user || user.status !== 'active') {
      store.commit('setNotification', { type: 'error', message: 'You are not authorized to access this page', show: true });
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;