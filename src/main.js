import Vue from 'vue'

import 'isomorphic-fetch'
import 'flexboxgrid'

import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import VueApollo from 'vue-apollo'

import * as VueGoogleMaps from 'vue2-google-maps'

import Youtube from 'vue-youtube-embed'

import App from './App'
import router from './router'

Vue.config.productionTip = false

// Setting up Apollo
const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj59tz3nfrlhy0105885qy550',
  transportBatching: true
})

const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj59tz3nfrlhy0105885qy550', {
  reconnect: true
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App }
})
