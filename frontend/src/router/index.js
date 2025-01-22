import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AdminHome from '../views/admin/AdminHome.vue';

// Import your views/components here

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'AdminHome',
    component: AdminHome
  },
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_PATH || '/'),
  routes
});

export default router;