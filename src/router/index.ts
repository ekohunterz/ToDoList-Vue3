import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        isProtected: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue'),
      meta: {
        isProtected: true
      }
    }
  ]
})

async function authGuard(to: any) {
  // Ensures the user is initialized
  const user = await getCurrentUser()
  if (to.meta.isProtected && !user) {
    // Redirect to a login page
    return '/login'
  }
}

router.beforeEach(authGuard)

export default router
