import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Comparator from '../views/Comparator.vue'
import Catalog from '../views/Catalog.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/comparator', name: 'comparator', component: Comparator },
  { path: '/catalog', name: 'catalog', component: Catalog },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
