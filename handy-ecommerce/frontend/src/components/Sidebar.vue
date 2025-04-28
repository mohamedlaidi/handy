<template>
    <aside class="side-menu" :class="{ active: open }">
      <ul>
        <li v-for="cat in categories" :key="cat.name">
          <router-link :to="`/${cat.name}`" class="side-link">
            {{ cat.label }}
          </router-link>
        </li>
      </ul>
    </aside>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  const props = defineProps({ open: Boolean })
  const categories = [
    { name: 'Furniture', label: 'Furniture' },
    { name: 'Jewellery', label: 'Jewellery' },
    { name: 'Clothing', label: 'Clothing' },
    { name: 'Tableware', label: 'Tableware' }
  ]
  </script>
  
  <style scoped>
  .side-menu {
    font-size: 2rem;
    position: fixed;
    top: 0;
    left: -220px;
    width: 200px;
    height: 100%;
    background: #ab8d6c;
    transition: left 0.3s ease;
    padding-top: 80px;
    z-index: 999;
    font-family: "The Seasons";
  }
  .side-menu.active {
    left: 0;
  }
  .side-menu ul {
    list-style: none;
    padding: 0;
  }
  .side-link {
    display: block;
    padding: 1rem;
    color: white;
    text-decoration: none;
    font-weight: 500;
  }
  .side-link:hover {
    background: #a78760;
  }
  </style>