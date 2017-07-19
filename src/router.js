import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/scenes/Home'
import MapSelection from '@/scenes/MapSelection'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/:game',
      name: 'MapSelection',
      component: MapSelection
    }
  ]
})
