<template>

  <router-view />
  
</template>

<script>
export default {
  name: 'App'
};
</script>
import { ref, onMounted } from 'vue'

const user = ref(null)

onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
})
<style>
/* Ici tu peux placer tes styles globaux, ou les laisser vides car tout est dans style_ameliore.css */
</style>
