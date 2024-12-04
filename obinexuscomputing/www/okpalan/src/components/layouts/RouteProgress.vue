```vue
<template>
  <div 
    class="route-progress" 
    :class="{ 'is-loading': loading }"
    :style="{ '--progress': progress + '%' }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const progress = ref(0)
let progressInterval: ReturnType<typeof setInterval>

const startProgress = () => {
  loading.value = true
  progress.value = 0
  progressInterval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 10
    }
  }, 200)
}

const finishProgress = () => {
  progress.value = 100
  setTimeout(() => {
    loading.value = false
    progress.value = 0
    clearInterval(progressInterval)
  }, 200)
}

// Router hooks
onMounted(() => {
  router.beforeEach(() => {
    startProgress()
    return true
  })

  router.afterEach(() => {
    finishProgress()
  })

  router.onError(() => {
    finishProgress()
  })
})

onUnmounted(() => {
  clearInterval(progressInterval)
})
</script>

<style scoped>
.route-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: transparent;
  z-index: 9999;
  pointer-events: none;
}

.route-progress.is-loading::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: var(--progress, 0%);
  height: 100%;
  background: #42b983;
  transition: width 0.2s ease;
}

@media (prefers-reduced-motion: reduce) {
  .route-progress.is-loading::before {
    transition: none;
  }
}
</style>
```