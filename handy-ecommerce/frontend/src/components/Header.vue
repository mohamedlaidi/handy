<!-- frontend/src/components/Header.vue -->
<template>
  <header class="main-header">
    <div class="logo-menu">
      <router-link to="/" class="logo">HANDY</router-link>
      <button class="burger-button" @click="$emit('toggle-sidebar')">
        <MenuIcon class="icon" />
      </button>
    </div>

    <nav class="top-nav">
      <router-link to="/artist"    class="nav-link">Artists</router-link>
      <router-link to="/aboutus"   class="nav-link">About us</router-link>
      <template v-if="user && user.role === 'artisan'">
        <router-link to="/product"   class="nav-link">Your Products</router-link>
        <router-link to="/ajoutproduit" class="nav-link">Add Product</router-link>
      </template>
    </nav>
    
    <div class="icons">
      <!-- if user is logged in, show their name + logout -->
      <template v-if="user">
        <span>{{ user.firstName }} {{ user.lastName }}</span>
        <button class="icon-wrapper" @click="logout" title="Logout">
          <LogOutIcon class="icon" />
        </button>
      </template>
      <!-- otherwise show login icon -->
      <template v-if="user">
        <router-link to="/profil" class="icon-wrapper" title="Profile">
          <UserIcon class="icon" />
        </router-link>
      </template>
      <template v-else>
        <router-link to="/login" class="icon-wrapper" title="Login">
          <UserIcon class="icon"/>
        </router-link>
      </template>

      <!-- the rest of your icons unchanged -->
      <router-link to="/cart" class="icon-wrapper" title="Cart">
        <ShoppingCartIcon class="icon" />
      </router-link>
      <router-link to="/cart" class="icon-wrapper" title="Checkout">
        <CreditCardIcon class="icon" />
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import {
  Menu         as MenuIcon,
  User         as UserIcon,
  LogOut       as LogOutIcon,
  ShoppingCart as ShoppingCartIcon,
  CreditCard   as CreditCardIcon
} from 'lucide-vue-next'

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
})

const router = useRouter()

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.main-header {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 60px;
  background-color: #800000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 1000;
}

.logo {
  font-size: 1.6rem; font-weight: bold;
  color: white; text-decoration: none;
}

.burger-button {
  background: none; border: none; padding: 0; cursor: pointer;
}

.top-nav {
  display: flex; gap: 1rem;
}

.nav-link {
  color: white; text-decoration: none; font-weight: 500;
}

.nav-link:hover { text-decoration: underline; }

.icons {
  display: flex; align-items: center; gap: 0.75rem;
  margin-right: 1rem;
}

.icon-wrapper {
  display: flex; align-items: center; justify-content: center;
  width: 36px; height: 36px;
  background: rgba(255,255,255,0.1);
  border-radius: 6px;
  cursor: pointer;
}

.icon-wrapper:hover {
  background: rgba(255,255,255,0.2);
}

.icon {
  width: 24px; height: 24px;
  stroke: #f3c892;
  stroke-width: 2;
}
</style>
