<template>
    <header class="page-header page-header--hero" :class="{ 'has-background-image': bgPattern }">
      <div class="safe-area page-header__container">
        <div class="page-header__content">
          <h1 class="page-header__title">
            Relativistic Clock Visualization
          </h1>
          
          <p class="page-header__subtitle">
            Explore time dilation effects in special relativity through interactive visualization
          </p>
          
          <nav class="nav-links">
            <router-link 
              v-for="link in navLinks" 
              :key="link.path"
              :to="link.path"
              class="nav-link"
              active-class="nav-link--active"
            >
              {{ link.text }}
            </router-link>
          </nav>
        </div>
  
        <div class="header-actions">
          <slot name="actions">
            <router-link to="/docs" class="action-button">
              View Documentation
            </router-link>
            <router-link to="/about" class="action-button action-button--secondary">
              Learn More
            </router-link>
          </slot>
        </div>
      </div>
  
      <div class="page-header__overlay" aria-hidden="true"></div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import patternImage from '@/assets/png/pattern.png'
  
  const bgPattern = ref(patternImage)
  
  const navLinks = [
    { path: '/', text: 'Home' },
    { path: '/about', text: 'About' },
    { path: '/docs', text: 'Documentation' }
  ]
  </script>
  
  <style lang="scss" scoped>
  .page-header {
    position: relative;
    padding: clamp(3rem, 10vh, 6rem) 0;
    background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    color: white;
    overflow: hidden;
    text-align: center;
    min-height: calc(40vh - var(--header-height, 0px));
  
    &__container {
      position: relative;
      z-index: 2;
      display: grid;
      gap: 2rem;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }
  
    &__content {
      max-width: 800px;
      margin: 0 auto;
    }
  
    &__title {
      font-size: clamp(2.5rem, 7vw, 4rem);
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1rem;
      animation: slideUp 0.5s ease forwards;
    }
  
    &__subtitle {
      font-size: clamp(1.25rem, 3vw, 1.5rem);
      opacity: 0.9;
      line-height: 1.6;
      margin-bottom: 2rem;
      animation: slideUp 0.5s ease 0.1s forwards;
    }
  
    &__overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1;
    }
  }
  
  .nav-links {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    margin-top: 2rem;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  
    &--active {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  
  .header-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
  }
  
  .action-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    background: #42b983;
    color: white;
  
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  
    &--secondary {
      background: transparent;
      border: 2px solid white;
  
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .header-actions {
      flex-direction: column;
      align-items: stretch;
      max-width: 300px;
      margin-left: auto;
      margin-right: auto;
    }
  
    .nav-links {
      flex-direction: column;
      align-items: center;
    }
  }
  </style>