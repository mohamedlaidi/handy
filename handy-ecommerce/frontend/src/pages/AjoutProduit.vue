<template>
  <div class="add-product-container">
    <h1>Add a New Product</h1>
    <form @submit.prevent="submitProduct">
      <!-- Nom -->
      <div class="form-group">
        <label for="name">Product Name</label>
        <input id="name"
               type="text"
               v-model="product.name"
               placeholder="Product Name"
               required />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description"
                  v-model="product.description"
                  placeholder="Product Description"
                  required></textarea>
      </div>

      <!-- Prix -->
      <div class="form-group">
        <label for="price">Price (€)</label>
        <input id="price"
               type="number"
               v-model.number="product.price"
               placeholder="Price (€)"
               required />
      </div>

      <!-- Catégorie -->
      <div class="categories">
        <p>Select a Category:</p>
        <label v-for="cat in categories"
               :key="cat"
               class="category-radio">
          <input type="radio"
                 :value="cat"
                 v-model="product.category"
                 name="category"
                 required />
          <span class="dot"></span>
          <span class="category-name">{{ cat }}</span>
        </label>
      </div>

      <!-- Image -->
      <div class="form-group">
        <label for="image">Photo</label>
        <input id="image"
               type="file"
               accept="image/*"
               @change="onFileChange"
               required />
      </div>

      <button type="submit" class="submit-btn">
        Add Product
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// État du formulaire
const product = ref({
  name:        '',
  description: '',
  price:       null,
  category:    '',
  imageFile:   null
})

// Liste des catégories
const categories = ['Jewellery','Furniture','Clothing','Tableware']

// Récupère le fichier sélectionné
function onFileChange(e) {
  const file = e.target.files[0]
  if (file) product.value.imageFile = file
}

// Soumet le produit à l’API
async function submitProduct() {
  // Vérif rapide
  if (!product.value.imageFile) {
    return alert('Photo requise')
  }

  try {
    // Construit le FormData
    const form = new FormData()
    form.append('name',        product.value.name)
    form.append('description', product.value.description)
    form.append('price',       product.value.price)
    form.append('category',    product.value.category)
    form.append('image',       product.value.imageFile)

    // Récupère le token (JWT)
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Vous devez être connecté')

    // Appel à l’API
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // NE PAS ajouter de Content-Type ici !
      },
      body: form
    })

    // Parse la réponse JSON
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || 'Erreur lors de l’ajout du produit')
    }

    // Redirection vers la page de la catégorie
    router.push(`/${data.category.toLowerCase()}`)
  } catch (err) {
    alert(err.message)
  }
}
</script>

<style scoped>
.add-product-container {
  max-width: 500px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}
input[type="text"],
input[type="number"],
textarea,
input[type="file"] {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}
.categories {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.category-radio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.category-radio input { display: none; }
.category-radio .dot {
  width: 1rem;
  height: 1rem;
  border: 2px solid #800000;
  border-radius: 50%;
  position: relative;
}
.category-radio input:checked + .dot::after {
  content: '';
  position: absolute;
  top: 3px; left: 3px;
  width: 6px; height: 6px;
  background-color: #800000;
  border-radius: 50%;
}
.submit-btn {
  padding: 0.75rem;
  background-color: #800000;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
}
.submit-btn:hover {
  background-color: #a00000;
}
</style>
