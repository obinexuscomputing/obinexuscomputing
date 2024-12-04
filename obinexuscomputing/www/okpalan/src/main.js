import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import routes if you have them
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue')
  }
]

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create Pinia instance
const pinia = createPinia()

// Create and mount Vue app
const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

// Enable HMR
if (import.meta.hot) {
  import.meta.hot.accept()
}