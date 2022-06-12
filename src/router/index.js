import i18n from '@/plugins/i18n'
import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import Home from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      next(store.dispatch('filterTodos', i18n.t('FILTER.ALL') ))
    },
  },
  {
    path: '/all',
    name: 'all',
    component: Home,
    beforeEnter: (to, from, next) => {
      next(store.dispatch('filterTodos', i18n.t('FILTER.ALL') ))
    },
  },
  {
    path: '/active',
    name: 'active',
    component: Home,
    beforeEnter: (to, from, next) => {
      next(store.dispatch('filterTodos', i18n.t('FILTER.ACTIVE') ))
    },
  },
  {
    path: '/completed',
    name: 'completed',
    component: Home,
    beforeEnter: (to, from, next) => {
      next(store.dispatch('filterTodos', i18n.t('FILTER.COMPLETE') ))
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
