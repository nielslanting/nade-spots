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

  footer {
    font-size: 0.7em;
    text-transform: uppercase;
    text-align: center;
    padding-top: 50px;
    color: #7f8c8d;
    letter-spacing: 0.06em;
  }
</style>

<template>
  <div id="app">
    <main>
      <router-view
        :user="user"
      ></router-view>
    </main>
    <footer>
      Nadespots - Experiment created by Niels 'Animosity' Lanting - All images belong to their respective owners - {{ this.currentYear }}
    </footer>
  </div>
</template>

<script>
  import QUERY_USER from '@/queries/QUERY_USER'

  export default {
    name: 'app',
    data () {
      return {
        user: null
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
