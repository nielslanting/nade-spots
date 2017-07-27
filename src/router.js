import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/scenes/Home'
import Logout from '@/scenes/Logout'
import Callback from '@/scenes/Callback'
import MapSelection from '@/scenes/MapSelection'
import Dashboard from '@/scenes/Dashboard'
import DashboardDetails from '@/scenes/Dashboard/Details'
import DashboardAdd from '@/scenes/Dashboard/Add'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/callback',
      name: 'Callback',
      component: Callback
    }, {
      path: '/logout',
      name: 'Logout',
      component: Logout
    }, {
      path: '/:game',
      name: 'MapSelection',
      component: MapSelection
    }, {
      path: '/:game/:map',
      name: 'Dashboard',
      component: Dashboard,
      children: [{
        path: '/:game/:map/add',
        name: 'DashboardAdd',
        component: DashboardAdd
      }, {
        path: '/:game/:map/:detailId',
        name: 'DashboardDetails',
        component: DashboardDetails
      }]
    }
  ]
})
