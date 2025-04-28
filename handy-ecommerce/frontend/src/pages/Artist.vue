<template>
  <div class="home-container">
    <!-- Header & Sidebar -->
    <Header @toggle-sidebar="sidebarOpen = !sidebarOpen"
            @toggle-login="showLogin = !showLogin" />
    <Sidebar :open="sidebarOpen" />

    <main class="artist-content">
      <h1>Artists</h1>
      <p>
        <strong>Support Ammar’s craftsmanship in pottery</strong><br/>
        discover 
        <router-link to="/category/tableware" class="link-highlight">
          his products
        </router-link> this week!
      </p>

      <!-- List of Artists -->
      <div v-if="artisans.length > 0" class="artist-list">
        <div v-for="artisan in artisans" :key="artisan.id" class="artist-profile">
          <img :src="artisan.image" :alt="`Image of ${artisan.name}`" />
          <div class="artist-text">
            <h2>{{ artisan.name }}</h2>
            <hr />
            <p>{{ artisan.description }}</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'

const sidebarOpen = ref(false)
const showLogin   = ref(false)
const artisans    = ref([])

async function fetchArtisans() {
  try {
    const response = await fetch('/api/artisans')  // Remplacer par l'API réelle
    const data = await response.json()
    artisans.value = data.artisans || []  // Si la réponse contient une clé 'artisans'
  } catch (error) {
    console.error('Error fetching artisans:', error)
  }
}

onMounted(fetchArtisans)
</script>

<style scoped>
/* polices importées dans la racine ou ici si nécessaire */
@import url('https://fonts.googleapis.com/css2?family=The+Seasons&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap');

.artist-content {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.artist-content h1 {
  font-family: 'The Seasons', serif;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.artist-content p {
  font-family: 'Arimo', sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.artist-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.artist-profile {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  width: calc(33.33% - 1.5rem);
  margin-bottom: 3rem;
}

.artist-profile img {
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.artist-text {
  flex: 1;
}

.artist-text h2 {
  font-family: 'The Seasons', serif;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.artist-text h2 + hr {
  width: 100px;
  height: 3px;
  background: #800000;
  border: none;
  margin: 0 0 1rem 0;
}

.artist-text p {
  font-family: 'Arimo', sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 1rem;
}

/* ----- PARTIE RESPONSIVE ----- */
@media (max-width: 768px) {
  .artist-profile {
    width: 100%;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .artist-text {
    width: 100%;
  }

  .artist-content h1 {
    font-size: 1.5rem;
  }

  .artist-text h2 {
    font-size: 1.5rem;
  }

  .artist-content p,
  .artist-text p {
    font-size: 1rem;
  }
}
</style>
