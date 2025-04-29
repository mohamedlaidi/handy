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