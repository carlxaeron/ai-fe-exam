import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import store from '../store';

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
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Dashboard,
    meta: { type: 'admin' }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_PATH || '/'),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.type === 'admin') {
    const user = store.getters.getCurrentUser;
    console.log(user);
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