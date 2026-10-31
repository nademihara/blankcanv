import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Urutan import ini penting: Tailwind dulu, style custom sesudahnya
// biar style custom tetap diatas kalau ada bentrok (sama kayak link di index.html lama).
import './input.css'
import './style.css'

createApp(App).use(router).mount('#app')
