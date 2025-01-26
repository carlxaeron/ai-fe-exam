import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import store from '../store';
import Media from '@/views/admin/Media.vue';
import NotFound from '@/views/NotFound.vue';
import Users from '@/views/admin/Users.vue';
import { ACTIVE, EDITOR } from '@/utils/helper';

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
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    meta: { type: 'admin' }
  },
  {
    path: '/:pathMatch(.*)*', // Catch-all route for 404
    name: 'NotFound',
    component: NotFound,
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
    if (!user || user.status !== ACTIVE) {
      store.commit('setNotification', { type: 'error', message: 'You are not authorized to access this page', show: true });
      next({ name: 'Login' });
    } else if(to.name === 'Users' && user.type !== EDITOR) {
      store.commit('setNotification', { type: 'error', message: 'You are not authorized to access this page', show: true });
      next({ name: 'Dashboard' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;