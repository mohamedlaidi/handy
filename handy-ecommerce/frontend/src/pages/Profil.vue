<template>
  <div class="home-container">
    <!-- pass `user` into Header -->
    <Header
      :user="user"
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @toggle-login="showLogin = !showLogin"
    />
    <Sidebar :open="sidebarOpen" />
    <div class="profile-container">
      <div class="profile-card">
        <img :src="user.avatar" alt="Photo de profil" class="avatar" />
        <h2>{{ user.name }}</h2>
        <p class="email">{{ user.email }}</p>
        <p class="bio">{{ user.bio }}</p>
      </div>
    </div>
     <Footer />
  </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
import Header  from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer  from '../components/Footer.vue'
  
  // Données fictives (tu peux les remplacer par des props ou des données API)
  const user = reactive({
    name: 'Amina L.',
    email: 'amina@example.com',
    bio: 'Artisane céramiste passionnée par la terre et les formes naturelles.',
    avatar: 'https://i.pravatar.cc/150?img=47'
  })
  </script>
  
  <style scoped>
  .profile-container {
    display: flex;
    justify-content: center;
    padding: 2rem;
  }
  
  .profile-card {
    background-color: #fff;
    border-radius: 12px;
    padding: 2rem;
    max-width: 400px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }
  
  h2 {
    margin-bottom: 0.25rem;
    font-size: 1.5rem;
  }
  
  .email {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .bio {
    font-size: 1rem;
    color: #333;
  }
  </style>
  