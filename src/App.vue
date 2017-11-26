<style lang="scss">
  @import '~flexboxgrid-sass';
  @import url('https://fonts.googleapis.com/css?family=Montserrat');
  @import url('https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');

  * {
    box-sizing: border-box;
  }

  body, html {
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    background-color: #2c3e50;
    color: #ecf0f1;

    padding: 20px;
    padding-bottom: 30px;
    padding-top: 0;

    max-width: 1200px;
    margin: 0 auto;
  }

  main {
    text-align: center;
    margin-top: 40px;
  }

  /* Let's get this party started */
  ::-webkit-scrollbar {
      width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
      border-radius: 3px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background: #ecf0f1;
  }
  ::-webkit-scrollbar-thumb:window-inactive {
    background: #bdc3c7;
  }
  h1 > em {
    font-style: normal;
    color: #CD9600;
  }

  h2 {
    font-weight: 200;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    font-size: 1.4em;
  }

  .footer {
    font-size: 0.7em;
    text-transform: uppercase;
    text-align: center;
    padding-top: 50px;
    color: #7f8c8d;
    letter-spacing: 0.06em;
    height: 55px;
    line-height: 55px;
    margin-bottom: 100px;


    &__left {
      float: left;
    }

    &__right {
      float: right;
      text-align: right;

      & a {
        text-decoration: none;
        color: #999;
        margin: 5px;

        &:hover {
          color: #cd9600;
        }
      }
    }
  }
</style>

<template>
  <div id="app">
    <main>
      <router-view
        :user="user"
      ></router-view>
    </main>

    <footer class="footer">
      <div class="footer__left">
        <a href="https://graph.cool" target="_blank">
          <img :src="graphcoolBadge" alt="">
        </a>

        <a href="https://netlify.com" target="_blank">
          <img :src="netlifyBadge" alt="">
        </a>

        <a href="https://github.com/nielslanting/nade-spots" target="_blank">
          <img :src="githubBadge" alt="">
        </a>
      </div>

      <div class="footer__right">
        <router-link :to="{ name: 'Disclaimer' }">
          Dislaimer
        </router-link>
        <router-link :to="{ name: 'Terms' }">
          Terms
        </router-link>
      </div>
    </footer>
  </div>
</template>

<script>
  import GraphcoolBadge from '@/assets/badges/graphcool.png'
  import NetlifyBadge from '@/assets/badges/netlify.png'
  import GithubBadge from '@/assets/badges/github.png'
  import QUERY_USER from '@/graphql/QUERY_USER'

  export default {
    name: 'app',
    data () {
      return {
        user: null,
        graphcoolBadge: GraphcoolBadge,
        netlifyBadge: NetlifyBadge,
        githubBadge: GithubBadge
      }
    },
    computed: {
      currentYear () {
        return new Date().getFullYear()
      }
    },
    apollo: {
      user: {
        query: QUERY_USER,
        fetchPolicy: 'network-only'
      }
    }
  }
</script>
