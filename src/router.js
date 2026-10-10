import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import BidangView from './views/BidangView.vue'
import ProjectView from './views/ProjectView.vue'
import TentangView from './views/TentangView.vue'
import KontakView from './views/KontakView.vue'
import GaleriView from './views/GaleriView.vue'

// Routes conf 
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/bidang', name: 'bidang', component: BidangView },
  { path: '/project', name: 'project', component: ProjectView },
  { path: '/tentang', name: 'tentang', component: TentangView },
  { path: '/kontak', name: 'kontak', component: KontakView },
  { path: '/galeri', name: 'galeri', component: GaleriView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router