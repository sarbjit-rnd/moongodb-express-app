import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import './assets/main.css'
const app = createApp(App)
app.use(router)
app.use(vue3GoogleLogin, {
    clientId: '994291343177-eafktcmungc9egqnj7ib7ejjhf3ct37n.apps.googleusercontent.com'
  })
  
app.mount('#app')
