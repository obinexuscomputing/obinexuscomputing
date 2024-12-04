import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routers'
import App from './App.vue'

// Create Vue application
const app = createApp(App)

// Install plugins
app.use(createPinia())
app.use(router)

// Mount application
app.mount('#app')

// Enable HMR in development
if (import.meta.hot) {
  import.meta.hot.accept()
}