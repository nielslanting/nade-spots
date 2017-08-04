<style>
  .add-container {
    height: 100%;
  }  
</style>

<template>
  <div class="add-container">
    <router-view
      :user="user"
      :types="types"
      :usages="usages"
      :minimap="minimap"
      :map="map"
    ></router-view> 
  </div>
</template>

<script>
  export default {
    name: 'Add',
    props: ['user', 'types', 'minimap', 'map'],
    data () {
      return {
        usages: ['GENERAL', 'OFFENSIVE', 'DEFENSIVE']
      }
    }
  }
</script>
