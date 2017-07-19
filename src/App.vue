<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat');

  * {
    box-sizing: border-box;
  }

  body, html {
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    margin: 0;
    background-color: #2c3e50;
    color: #ecf0f1;

    padding: 20px;
    padding-bottom: 40px
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
</style>

<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>
