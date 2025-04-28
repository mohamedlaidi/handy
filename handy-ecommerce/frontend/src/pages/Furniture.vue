<template>
  <div class="tableware-page">
    <Header :user="user" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <Sidebar :open="sidebarOpen" />

    <main class="content">
      <section class="intro-hero-container">
        <div class="introduction">
          <h2 class="intro-title">Furnitures</h2>
          <p class="intro-text">
            Each piece of furniture is a unique creation that reflects the rich
            cultural heritage and artistry of its origin. By choosing our handmade
            furniture, you are not only acquiring a beautiful item for your home
            but also supporting skilled artisans who pour their heart and soul
            into their craft.
          </p>
        </div>

        <div class="hero">
          <div class="hero-image">
            <img src="/img/furnitures_image1.jpg" alt="Artisan at work" />
          </div>
        </div>
      </section>

      <section class="products">
        <div
          class="product"
          v-for="item in items"
          :key="item._id"
        >
          <h3 class="product-country">{{ item.name }}</h3>
          <img :src="item.imageUrl" :alt="item.name" />
          <p class="product-price">{{ item.price }}€</p>
          <!-- View Product button -->
          <router-link
            :to="`/product/${item._id}`"
            class="btn-view"
          >
            View Product    
          </router-link>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import Header  from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer  from '../components/Footer.vue'

const sidebarOpen = ref(false)
const items       = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('/api/products')
    // ne garder que "Furniture"
    items.value = res.data.filter(p => p.category === 'Furniture')
  } catch (err) {
    console.error('Erreur lors du chargement des produits :', err)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=The+Seasons&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap');

.content {
  display: flex;
  flex-direction: column;
  background-color: #827e5b;
}

.intro-hero-container {
  display: flex;
  background-color: #827e5b;
}

.introduction {
  flex: 1;
  padding: 2rem;
}

.intro-title {
  font-size: 3rem;
  padding-top: 2rem;
  color: white;
  font-family: 'Heebo', sans-serif;
  text-decoration: underline;
}

.intro-text {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-top: 0.5rem;
  color: white;
  font-family: 'Heebo', sans-serif;
}

.hero {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #827e5b;
  color: white;
}

.hero-image img {
  max-width: 25rem;
  height: auto;
  object-fit: cover;
}

.products {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2rem 1rem;
  background-color: #f5f5f5;
  gap: 2rem;
}

.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 220px;
  flex: 1 1 200px;
  box-sizing: border-box;
}

.product-country {
  font-family: 'The Seasons', serif;
  font-size: 1.6rem;
  margin-bottom: 2rem;
}

.product img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border: 1px solid #ccc;
}

.product-name {
  background-color: #827e5b;
  color: white;
  padding: 1rem;
  margin-top: 0.5rem;
  width: 100%;
  text-align: center;
  font-weight: bold;
}

.product-price {
  margin-top: 0.3rem;
  font-weight: bold;
  font-family: 'Heebo';
  font-size: 1.6rem;
}
.btn-view {
  display: inline-block;
  background-color: #b7bfaa;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
}

.btn-view:hover {
  background-color: #a3b59a;
}
</style>
