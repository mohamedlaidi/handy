// File: frontend/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Product from '../pages/Product.vue';
import Tableware from '../pages/Tableware.vue';
import Profil from '../pages/Profil.vue';
import AjoutProduit from '../pages/AjoutProduit.vue';
import Clothing from "../pages/Clothing.vue";
import Furniture from "../pages/Furniture.vue";
import Jewellery from "../pages/Jewellery.vue";
import Artist from "../pages/Artist.vue";
import Cart from '../pages/Cart.vue';
import AboutUs from '../pages/AboutUs.vue';


const routes = [
  { path: '/', component: Home},
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  // { path: '/product', component: Product},
  { path: '/product/:id', name: 'Product', component: Product },
  { path: '/tableware', name: 'Tableware', component: Tableware},
  { path: '/profil', component: Profil},
  { path: '/ajoutproduit', component: AjoutProduit },
  { path: '/clothing', name:'Clothing', component: Clothing},
  { path: '/furniture', name: 'Furniture', component: Furniture},
  { path: '/jewellery', name: 'Jewellery', component: Jewellery},
  { path: '/artist', component: Artist},
  { path: '/cart', component: Cart},
  { path: '/aboutus', component: AboutUs}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router;