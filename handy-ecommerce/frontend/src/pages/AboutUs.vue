<template>
  <div class="home-container">
    <!-- Header & Sidebar -->
    <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" @toggle-login="showLogin = !showLogin" />
    <Sidebar :open="sidebarOpen" />

    <div class="about-content">
      <h1>About Us</h1>

      <!-- 1) À propos de HANDY -->
      <section class="about-section">
        <div class="text-block">
          <h2>About HANDY</h2>
          <hr />
          <p>
            HANDY is an ethical, for-profit marketplace that connects traditional artisans from around 
            the world directly with customers who care about quality and fair pay. Our mission: 
            to showcase handcrafted expertise and guarantee a fair price—far from the excessive 
            margins charged by middlemen.
          </p>
        </div>
        <img src="/img/aboutus_shea2.jpg" alt="Artisan indien" loading="lazy" />
      </section>

      <!-- 2) Pourquoi HANDY ? -->
      <section class="about-section reverse">
        <div class="text-block">
          <h2>Why HANDY ?</h2>
          <hr />
          <p>
            At HANDY, we’ve seen too many talented artisans trapped in distribution channels dominated by large
            corporations that profit from their work without truly recognizing them. We aim to break this cycle by:
            </p>
            <ol>
              <li>Empowering artisans with a global showcase.</li>
              <li>Educating buyers about each product’s origin, techniques, and cultural context.</li>
              <li>Supporting a fair-trade model where every creator and customer wins</li>
            </ol>
        </div>
        <img src="/img/aboutus_shea.jpg" alt="Artisan indien" loading="lazy" />
      </section>

      <!-- 3) Engagement & modèle économique -->
      <section class="two-column">
        <div class="text-block">
          <h2>Our Commitment</h2>
          <hr />
          <ul>
              <li><strong>Total Transparency: all prices, origins, and commissions are fully disclosed.</strong> prix, provenance et commissions affichés.</li>
              <li><strong>Commerce responsable :</strong> Responsible Commerce: we encourage environmentally respectful production methods.</li>
              <li><strong>Local Support:</strong> we provide training and ongoing assistance to artisan communities.</li>
            </ul>
        </div>
        <div class="text-block">
          <h2>Our Economic Model</h2>
          <hr />
          <p>
            HANDY charges a flat 10 % commission on every sale to cover platform development, marketing, and logistics.
            The remaining 90 % goes directly to the artisan, ensuring a truly win-win partnership.
            </p>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'

const sidebarOpen = ref(false)
const showLogin = ref(false)
</script>

<style scoped>
/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=The+Seasons&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap');

/* Conteneur principal */
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Main content */
.about-content {
  flex-grow: 1;
  padding: 80px 2rem 4rem;
  max-width: 1000px;
  margin: 0 auto;
}

/* Titre principal */
.about-content h1 {
  font-family: 'The Seasons', serif;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

/* Sections */
.about-section {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap; /* au cas où */
}

.about-section.reverse {
  flex-direction: row-reverse;
}

.text-block {
  flex: 1;
}

.text-block h2 {
  font-family: 'The Seasons', serif;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.text-block h2 + hr {
  width: 100px;
  height: 3px;
  background: #800000;
  border: none;
  margin: 0 0 1rem 0;
}

/* Images */
.about-section img {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  object-fit: cover;
}

/* Two-column layout */
.two-column {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
}

.two-column .text-block {
  flex: 1;
}

/* Texte */
.text-block p,
.text-block ul,
.text-block ol,
.text-block li {
  font-family: 'Arimo', sans-serif;
  font-size: 1.1rem;
  line-height: 1.7;
}

/* Footer */
footer {
  margin-top: auto;
}

/* RESPONSIVE PART */
@media (max-width: 768px) {
  .about-section,
  .about-section.reverse,
  .two-column {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .about-content h1 {
    font-size: 1.7rem;
  }

  .text-block h2 {
    font-size: 1.5rem;
  }

  .text-block p,
  .text-block ul,
  .text-block ol,
  .text-block li {
    font-size: 1rem;
  }

  .about-section img {
    max-width: 90%;
  }
}
</style>
