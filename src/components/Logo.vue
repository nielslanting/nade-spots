<style lang="scss" scoped>
  .logo {
    & img {
      width: 100px;
      height: 100px;
      transform: rotate(-15deg);
      color: white;
    }

    & a {
      text-decoration: none;
      color: #ecf0f1;   
    }

    &__title {
      font-size: 2em;
      font-weight: bold;

      & em {
        font-style: normal;
        color: #CD9600;
      }
    }
  }
</style>

<template>
  <div class="logo">
    <img
      v-show="!hideImage"
      :style="{ height: 100, width: 100 }"
      class="logo__img"
      src="../assets/logo.svg"
      alt="Nadespots logo"
    >
    <router-link :to="{name: 'Home'}">
      <h1 v-if="!noHeader">
        Nade<em>spots</em>
      </h1>
      <div v-else class="logo__title">
        Nade<em>spots</em>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'Logo',
    props: ['hideImage', 'noHeader']
  }
</script>
