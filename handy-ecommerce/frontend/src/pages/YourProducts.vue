<template>
  <div class="home-container">
    <Header :user="user" @toggle-sidebar="sidebarOpen = !sidebarOpen" @toggle-login="showLogin = !showLogin" />
    <Sidebar :open="sidebarOpen" />

    <div class="your-products-container">
      <h1>Mes Produits</h1>

      <div v-if="products.length === 0" class="empty">
        <p>Vous n'avez pas encore ajouté de produits.</p>
      </div>

      <div v-else class="products-grid">
        <div v-for="product in products" :key="product._id" class="product-card">
          <img :src="product.image" alt="Produit" class="product-image" />
          <h2>{{ product.name }}</h2>
          <p class="price">{{ product.price }} €</p>
          <p class="description">{{ product.description }}</p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'

// Simuler l'utilisateur connecté (normalement récupéré du store ou token)
const user = ref({
  id: user.id, // ⚡ Remplacer par vrai ID du user connecté
  name: 'Amina L.'
})

const sidebarOpen = ref(false)
const showLogin = ref(false)

const products = ref([])

onMounted(async () => {
  try {
    // Va chercher les produits ajoutés par l'utilisateur connecté
    const response = await axios.get(`/api/products/mine`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // si tu as JWT
      }
    })
    products.value = response.data
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error)
  }
})
</script>

<style scoped>
.your-products-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.empty {
  text-align: center;
  color: #666;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.price {
  font-weight: bold;
  color: #800000;
  margin-top: 0.5rem;
}

.description {
  font-size: 0.9rem;
  color: #555;
  margin-top: 0.5rem;
}

</style>
