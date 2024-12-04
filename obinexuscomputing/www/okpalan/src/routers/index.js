import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: {
      title: 'Relativistic Clock Visualization',
      description: 'Interactive visualization of special relativity time dilation effects'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/About.vue'),
    meta: {
      title: 'About - Relativistic Clock',
      description: 'Learn more about the relativistic clock visualization project'
    }
  },
  // Catch all 404 route
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/404.vue'),
    meta: {
      title: 'Page Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards for meta title and analytics
router.beforeEach((to, from, next) => {
  // Update document title
  document.title = to.meta.title || 'Relativistic Clock'
  
  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', to.meta.description || '')
  }
  
  next()
})

// Optional: Analytics tracking
router.afterEach((to) => {
  // You can add analytics tracking here if needed
  console.log(`Navigated to: ${to.name}`)
})

// Error handling
router.onError((error) => {
  console.error('Router error:', error)
  router.push({ name: 'not-found' })
})

export default router