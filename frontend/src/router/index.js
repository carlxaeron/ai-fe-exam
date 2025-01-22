import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

// Import your views/components here

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
];

if (process.env.VUE_APP_BASE_PATH) routes.forEach(route => route.path = process.env.VUE_APP_BASE_PATH + route.path);

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;