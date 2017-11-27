import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/scenes/Home'
import Logout from '@/scenes/Logout'
import Callback from '@/scenes/Callback'

import Disclaimer from '@/scenes/Disclaimer'
import Terms from '@/scenes/Terms'

import MapSelection from '@/scenes/MapSelection'
import MapSelectionAdd from '@/scenes/MapSelection/Add'

import Dashboard from '@/scenes/Dashboard'
import DashboardDetails from '@/scenes/Dashboard/Details'
import DashboardAdd from '@/scenes/Dashboard/Add'
import DashboardAddDetails from '@/scenes/Dashboard/Add/Details'
import DashboardAddContent from '@/scenes/Dashboard/Add/Content'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: Disclaimer
    }, {
      path: '/terms',
      name: 'Terms',
      component: Terms
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
      redirect: { name: 'MapSelection' }
    }, {
      path: '/:game/',
      name: 'MapSelection',
      pathToRegexpOptions: { strict: true },
      component: MapSelection,
      children: [{
        path: '/:game/add',
        name: 'MapSelectionAdd',
        component: MapSelectionAdd
      }]
    }, {
      path: '/:game/:map',
      redirect: { name: 'Dashboard' }
    }, {
      path: '/:game/:map/',
      name: 'Dashboard',
      pathToRegexpOptions: { strict: true },
      component: Dashboard,
      children: [{
        path: '/:game/:map/add',
        name: 'DashboardAdd',
        component: DashboardAdd,
        children: [{
          path: '/',
          component: DashboardAddDetails
        }, {
          path: '/:game/:map/add/details',
          name: 'DashboardAddDetails',
          component: DashboardAddDetails
        }, {
          path: '/:game/:map/add/content',
          name: 'DashboardAddContent',
          component: DashboardAddContent
        }]
      }, {
        path: '/:game/:map/:detailId',
        name: 'DashboardDetails',
        component: DashboardDetails
      }]
    }
  ]
})
