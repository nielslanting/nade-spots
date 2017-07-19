// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'isomorphic-fetch'
import 'flexboxgrid'

import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
import App from './App'
import router from './router'

Vue.config.productionTip = false

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

import VueApollo from 'vue-apollo'
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  clients: {
    a: apolloClient
  },
  defaultClient: apolloClient
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  template: '<App/>',
  components: { App }
})
