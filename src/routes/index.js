import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'

const routes = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

export default routes
