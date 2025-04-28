<template>
  <div :user="user" class="add-product-container">
    <h1>Add a New Product</h1>
    <form @submit.prevent="submitProduct" enctype="multipart/form-data">

      <!-- Nom -->
      <div class="form-group">
        <label for="name">Product Name</label>
        <input id="name" v-model="product.name" type="text" placeholder="Product Name" required />
      </div>

      <!-- Description -->
      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="product.description" placeholder="Product Description" required></textarea>
      </div>

      <!-- Prix -->
      <div class="form-group">
        <label for="price">Price (€)</label>
        <input id="price" v-model.number="product.price" type="number" placeholder="Price (€)" required />
      </div>

      <!-- Catégorie -->
      <div class="categories">
        <p>Select a Category:</p>
        <label v-for="cat in categories" :key="cat" class="category-radio">
          <input
            type="radio"
            :value="cat"
            v-model="product.category"
            name="category"
            required
          />
          <span class="dot"></span>
          <span class="category-name">{{ cat }}</span>
        </label>
      </div>

      <!-- Image -->
      <div class="form-group">
        <label for="image">Photo</label>
        <input id="image" type="file" @change="onFileChange" accept="image/*" required />
      </div>

      <button type="submit" class="submit-btn">Add Product</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const product = ref({
  name:        '',
  description: '',
  price:       null,
  category:    '',
  imageFile:   null
})

const categories = ['Jewellery','Furniture','Clothing','Tableware']

function onFileChange(e) {
  product.value.imageFile = e.target.files[0]
}

async function submitProduct() {
  if (!product.value.imageFile) return alert('Photo requise')
  try {
    const form = new FormData()
    form.append('name',        product.value.name)
    form.append('description', product.value.description)
    form.append('price',       product.value.price)
    form.append('category',    product.value.category)
    form.append('image',       product.value.imageFile)

    const token = localStorage.getItem('token')
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: form
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Erreur ajout produit')
    // redirige vers la page catégorie
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
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
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
  margin-bottom: 1.5rem;
}
.category-radio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
}
.category-radio input { display: none; }
.category-radio .dot {
  width: 1rem;
  height: 1rem;
  border: 2px solid #800000;
  border-radius: 9999px;
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
}
.submit-btn:hover {
  background-color: #a00000;
}
</style>
