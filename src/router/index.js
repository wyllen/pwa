import Vue from 'vue'
import Router from 'vue-router'

// Components
import Home from '../components/Home'
import Card from '../components/Card'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/pwa/',
      name: 'Home',
      component: Home,
      // props: { pageContentID: 383 }
    },
    {
      path: '/card/:id',
      name: 'Card',
      component: Card,
    }
  ],
  mode: 'history',
  base: '',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
