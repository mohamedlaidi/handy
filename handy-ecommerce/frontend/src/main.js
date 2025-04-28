import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/style_ameliore.css';
import './components/Header.vue';
import './components/Sidebar.vue';
import './components/Footer.vue';


createApp(App)
  .use(router)
  .mount('#app');
