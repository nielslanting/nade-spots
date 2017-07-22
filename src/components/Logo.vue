<style scoped>
  .logo {
    width: 100px;
    transform: rotate(-15deg);
  }

  a {
    text-decoration: none;
    color: #ecf0f1;
  }
</style>

<template>
  <div>
    <img
      v-show="!hideImage"
      class="logo"
      src="../assets/logo.svg"
      alt="Nadespots logo"
    >
    <router-link :to="{name: 'Home'}">
      <h1>
        Nade<em>spots</em>
      </h1>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
    props: ['hideImage']
  }
</script>
