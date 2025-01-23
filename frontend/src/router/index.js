import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/admin/Dashboard.vue';

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

export default router;