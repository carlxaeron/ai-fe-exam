// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/styles/global.scss';
import '@fortawesome/fontawesome-free/css/all.css'; // Import Font Awesome CSS

const app = createApp(App);

// Use the appropriate router based on the path
app.use(router);
app.use(store);

app.mount('#app');

document.addEventListener('DOMContentLoaded', () => {
  document.dispatchEvent(new Event('render-event'));
});
