import Vue from 'vue'

import 'isomorphic-fetch'

import { ApolloClient, createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

import * as VueGoogleMaps from 'vue2-google-maps'

import Vuelidate from 'vuelidate'

import Youtube from 'vue-youtube-embed'

import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

import VueGtm from 'vue-gtm'

import App from './App'
import router from './router'

Vue.config.productionTip = false

// Setting up Apollo
const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj59tz3nfrlhy0105885qy550',
  transportBatching: true
})

// Auth0 middleware
networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }

    // get the authentication token from local storage if it exists
    if (localStorage.getItem('auth0IdToken')) {
      req.options.headers.authorization = `Bearer ${localStorage.getItem('auth0IdToken')}`
    }
    next()
  }
}])

const apolloClient = new ApolloClient({
  // networkInterface: networkInterfaceWithSubscriptions,
  networkInterface: networkInterface,
  ssrForceFetchDelay: 100,
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  clients: {
    a: apolloClient
  },
  defaultClient: apolloClient
})

Vue.use(VueApollo)

// Setting up Google Maps
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB5Bito_jYPWhhjLWyX9FcUpZyKASo7jtM'
  }
})

// Setting up Youtube player
Vue.use(Youtube)

// Setting up form validation
Vue.use(Vuelidate)

// Setting up Google Tag Manager
Vue.use(VueGtm, {
  vueRouter: router
})

// Setting up sentry
Raven
.config('https://95cb59a8fd7645178268af19ef42e582@sentry.io/207572')
.addPlugin(RavenVue, Vue)
.install()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App }
})
