<!-- frontend/src/pages/Jewellery.vue -->
<template>
  <div class="tableware-page">
    <Header :user="user" @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <Sidebar :open="sidebarOpen" />

    <main class="content">
      <!-- Intro + Hero just as before -->
      <section class="intro-hero-container">
        <div class="introduction">
          <h2 class="intro-title">Jewellery</h2>
          <p class="intro-text">
            Each unique piece reflects rich cultural heritage and artistry.
            By choosing our handmade jewellery, you support skilled
            artisans who pour their heart and soul into their craft.
          </p>
        </div>
        <div class="hero">
          <div class="hero-image">
            <img src="/img/jewellery_image1.jpg" alt="Jewellery hero" />
          </div>
        </div>
      </section>

      <!-- Products grid -->
      <section class="products">
        <div
          class="product"
          v-for="prod in products"
          :key="prod._id"
        >
          <!-- Now product name -->
          <h3 class="product-country">{{ prod.name }}</h3>

          <!-- Image from mongo -->
          <img :src="prod.imageUrl" :alt="prod.name" />

          <!-- Price -->
          <p class="product-price">{{ prod.price }}€</p>

          <!-- View Product button -->
          <router-link
            :to="`/product/${prod._id}`"
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
import axios            from 'axios'
import Header           from '../components/Header.vue'
import Sidebar          from '../components/Sidebar.vue'
import Footer           from '../components/Footer.vue'

const sidebarOpen = ref(false)
const products     = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/products')
    products.value = data.filter(p => p.category === 'Jewellery')
  } catch (e) {
    console.error('Could not load jewellery products:', e)
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=The+Seasons&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap');

.content {
  display: flex;
  flex-direction: column;
  background-color: #b7bfaa;
}

.intro-hero-container {
  display: flex;
  background-color: #b7bfaa;
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
  background-color: #b7bfaa;
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
  background-color: #b7bfaa;
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
