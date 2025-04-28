<!-- frontend/src/pages/Product.vue -->
<template>
  <div class="home-container">
    <!-- Header & Sidebar -->
    <Header
      @toggle-sidebar="sidebarOpen = !sidebarOpen"
      @toggle-login="showLogin = !showLogin"
    />
    <Sidebar :open="sidebarOpen" />

    <!-- Contenu principal du produit -->
    <div class="container" v-if="product">
      <!-- Left side: product image and heart icon -->
      <div class="left-side">
        <img
          :alt="product.name"
          class="product-image"
          :src="product.imageUrl"
        />
        <button
          aria-label="Add to favorites"
          class="heart-button"
          :class="{ 'text-red-600': isFavorited }"
          @click="toggleFavorite"
        >
          {{ isFavorited ? '❤️' : '♡' }}
        </button>
      </div>

      <!-- Right side: product details -->
      <div class="right-side">
        <div class="brand">Artisan Collection</div>
        <h1 class="title">{{ product.name }}</h1>
        <p class="description">{{ product.description }}</p>

        <p class="description">
          <span v-if="showFullDescription" class="full-description">
            {{ product.description }}
          </span>
          <a href="#" class="learn-more" @click.prevent="toggleDescription">
            {{ showFullDescription ? 'Show less' : 'Learn more' }}
          </a>
        </p>

        <div class="price-section">
          <span class="price">€{{ product.price.toFixed(2) }}</span><br />
          <span class="price-per-liter">Price includes VAT</span>
        </div>

        <!-- Nouveau bouton Add to cart -->
        <div class="add-cart-container">
          <button class="add-cart-btn" @click="addToCart">
            Add to cart
          </button>
        </div>

        <!-- Artisan info sans l'image -->
        <div class="artisan-section">
          <p class="artisan-text">
            This <strong>{{ product.name }}</strong>
            was made by
            <strong>
              {{ product.author.firstName }} {{ product.author.lastName }}
            </strong>.
          </p>
        </div>
      </div>
    </div>

    <div v-else class="container">
      <p>Loading product…</p>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
// … vos imports existants …
import { ref, onMounted } from 'vue'
import { useRoute }      from 'vue-router'
import axios             from 'axios'
import Header            from '../components/Header.vue'
import Sidebar           from '../components/Sidebar.vue'
import Footer            from '../components/Footer.vue'

const route               = useRoute()
const sidebarOpen         = ref(false)
const showLogin           = ref(false)
const product             = ref(null)
const isFavorited         = ref(false)
const showFullDescription = ref(false)

const toggleFavorite = () => { isFavorited.value = !isFavorited.value }
const toggleDescription = () => { showFullDescription.value = !showFullDescription.value }

// ⚠️ Nouvelle version de addToCart() :
const addToCart = () => {
  // 1) On récupère l’utilisateur connecté
  const userJson = localStorage.getItem('user')
  if (!userJson) {
    alert('Merci de vous connecter pour ajouter au panier.')
    return
  }
  const user = JSON.parse(userJson)
  // 2) On définit une clé unique
  const storageKey = `cart_${user._id}`
  // 3) On récupère l’ancien panier (ou tableau vide)
  const cart = JSON.parse(localStorage.getItem(storageKey) || '[]')
  // 4) On ajoute/incrémente
  const idx = cart.findIndex(i => i.id === product.value._id)
  if (idx > -1) {
    cart[idx].quantity += 1
  } else {
    cart.push({
      id:          product.value._id,
      name:        product.value.name,
      description: product.value.description,
      price:       product.value.price,
      quantity:    1,
      image:       product.value.imageUrl
    })
  }
  // 5) On ré-écrit dans localStorage
  localStorage.setItem(storageKey, JSON.stringify(cart))
  alert('Produit ajouté à **VOTRE** panier ✅')
}

onMounted(async () => {
  try {
    const { data } = await axios.get(`/api/products/${route.params.id}`)
    product.value = data
  } catch (err) {
    console.error('Failed to load product:', err)
  }
})
</script>

<style scoped>
.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
}
.left-side {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
}
.product-image {
  max-width: 300px;
  width: 100%;
  height: auto;
}
.heart-button {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: black;
  transition: color 0.3s ease;
}
.heart-button:hover {
  color: #db2777;
}
.right-side {
  flex: 1;
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .right-side {
    margin-top: 0;
  }
}
.brand {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #9ca3af;
  margin-bottom: 0.25rem;
  user-select: none;
}
.title {
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.25;
  margin-bottom: 0.5rem;
}
.description {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}
.learn-more {
  text-decoration: underline;
  color: black;
}
.price-section {
  margin-bottom: 1rem;
}
.price {
  font-weight: 800;
  font-size: 1.875rem;
  line-height: 1;
}
.price-per-liter {
  font-size: 0.75rem;
  line-height: 1;
}

/* Styles du bouton Add to cart */
.add-cart-container {
  margin: 1rem 0;
}
.add-cart-btn {
  display: flex;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  transition: background 0.2s;
}
.add-cart-btn:hover {
  background-color: #333;
}

/* Artisan section (sans image désormais) */
.artisan-section {
  border: 1px solid black;
  padding: 1rem;
  max-width: 400px;
  display: flex;
  align-items: center;
}
.artisan-text {
  font-weight: 700;
  font-size: 0.875rem;
}
</style>
