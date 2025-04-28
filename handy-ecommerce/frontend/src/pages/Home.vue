<!-- frontend/src/pages/Home.vue -->
<template>
  <div class="home-container">
    <!-- pass `user` into Header -->
    <Header
      :user="user"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @toggle-login="showLogin = !showLogin"
    />
    <Sidebar :open="sidebarOpen" />

    <!-- Hero -->
    <main class="hero">
      <div class="hero-bg"></div>
      <div class="hero-text">
        <h2>Handy</h2>
        <p>
          <strong>Support Ammar's craftsmanship in pottery</strong><br />
          discovers
          <router-link to="/tableware" class="link-highlight">
            his products
          </router-link>
          this week!
        </p>
        <template v-if="!user">
          <router-link to="/Login" class="cta-button">
            Log in
          </router-link>
        </template>
      </div>
      <div class="scroll-indicator" @click="scrollDown">&#8964;</div>
    </main>

    <section v-if="showLogin" class="login-section">
      <!-- Composant Login ici -->
    </section>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header  from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer  from '../components/Footer.vue'

const sidebarOpen = ref(false)
const showLogin   = ref(false)

// load logged-in user from localStorage
const user = ref(null)
onMounted(() => {
  const stored = localStorage.getItem('user')
  if (stored) user.value = JSON.parse(stored)
})

const scrollDown = () => {
  window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
}
</script>
