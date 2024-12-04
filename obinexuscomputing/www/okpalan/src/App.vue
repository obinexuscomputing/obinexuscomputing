<template>
  <div class="app">
    <RouteProgress />
    <HeroHeader />
    <main class="main-content">
      <Transition name="fade" mode="out-in">
        <RouterView />
      </Transition>
    </main>
    <HeroFooter />
  </div>
</template>
  

<script setup>
import { RouterView } from 'vue-router'
import HeroHeader from '@/components/layouts/HeroHeader.vue'
import HeroFooter from '@/components/layouts/HeroFooter.vue'
</script>

<style>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
  background-image: url('@/assets/png/pattern.png');
  background-repeat: repeat;
  background-size: 200px;
}

/* App container */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Main content area */
.main-content {
  flex: 1;
  width: 100%;
}

/* Route transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Global utility classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
}
</style>