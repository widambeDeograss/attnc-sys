import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from './views/Dashboard.vue'
import Attendance from './views/Attendance.vue'
import Login from './views/Login.vue'
import Users from './views/Users.vue'
import Landing from './views/Landing.vue'
import store from './actions/Authentication'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: { layout: 'empty'  },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { layout: 'empty' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {  requiresAuth: true  },
  },
  {
    path: '/attendance',
    name: 'Attendance',
    component: Attendance,
    meta: { requiresAuth: true  },
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: {  requiresAuth: true  },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (!store.getters.isAuthenticated) {
      
      next('/login');
    } else {
      
      next();
    }
  } else {
    
    next();
  }
});


export default router
