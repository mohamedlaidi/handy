<template>
    <div class="login-page">
      <!-- Header -->
      <Header />
  
      <div class="login-content">
        <!-- Image side -->
        <div class="login-image">
          <img src="/img/Login.png" alt="Artisan at work" />
        </div>
        <!-- Form side -->
        <div class="login-form-container">
          <div class="login-form-card">
            <h2>Log In to Handy</h2>
            <form @submit.prevent="handleLogin">
              <div class="form-group">
                <label for="email">E-mail</label>
                <input id="email" type="email" v-model="email" required placeholder="you@example.com" />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="password" required placeholder="********" />
              </div>
              <button type="submit" class="btn-login">SIGN IN</button>
            </form>
            <div class="helper-links">
              <router-link to="/forgot" class="link-forgot">Forgot password?</router-link>
              <span> | </span>
              <router-link to="/register" class="link-signup">Join now</router-link>
            </div>
          </div>
        </div>
      </div>
  
      <Footer />
    </div>
  </template>
  
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const email    = ref('')
const password = ref('')
const router   = useRouter()

async function handleLogin() {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email:    email.value,
        password: password.value
      })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    router.push('/')  // redirection vers Home
  } catch (err) {
    alert(err.message)
  }
}
</script>
  
  <style scoped>
  .login-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  /* Content between header and footer */
  .login-content {
    flex: 1;
    display: flex;
    overflow: hidden;
    margin-top: 60px;
    margin-bottom: 50px;
  }
  
  .login-image {
    flex: 1;
  }
  .login-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
  }
  
  .login-form-container {
    width: 380px;
    background: #f8f4e6;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  
  .login-form-card {
    width: 100%;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .login-form-card h2 {
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
    text-align: left;
  }
  .form-group label {
    font-weight: 600;
    color: #555;
    margin-bottom: 0.5rem;
    display: block;
  }
  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }
  .form-group input:focus {
    border-color: #800000;
    outline: none;
  }
  
  .btn-login {
    width: 100%;
    padding: 0.75rem;
    background: #800000;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
  }
  .btn-login:hover {
    background: #660000;
  }
  
  .helper-links {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #555;
  }
  .helper-links .link-forgot,
  .helper-links .link-signup {
    color: #800000;
    text-decoration: none;
    font-weight: 500;
  }
  .helper-links .link-forgot:hover,
  .helper-links .link-signup:hover {
    text-decoration: underline;
  }
  </style>
  