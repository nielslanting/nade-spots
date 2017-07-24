<style scoped>
  .box.map {
    background-color: #34495e;
    margin-top: 10px;
    min-height: 150px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: center bottom;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .box.map > a {
    display: block;
    height: 100%;
    text-decoration: none;
    color: #ecf0f1;
    font-size: 0.9em;
    width: 100%;
    line-height: 150px;
    max-height: 150px;
  }

  .box.map:hover > a {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .title-col { text-align: left; }
  .dropShadow
  {
      position:relative;
      box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  }
  .dropShadow:before, .dropShadow:after
  {
    content:"";
      position:absolute; 
      z-index:-1;
      box-shadow:0 0 20px rgba(0,0,0,0.8);
      top:0;
      bottom:0;
      left:10px;
      right:10px;
      border-radius:100px / 10px;
  } 
  .dropShadow:after
  {
      right:10px; 
      left:auto; 
      transform:skew(8deg) rotate(3deg);
  }

  .back-button {
    color: #bdc3c7;
    background-color: #34495e;
    padding: 5px;
    border-radius: 3px;
    text-decoration: none; 
    padding-left: 10px;
    padding-right: 10px;
  }
  .back-button:hover {
    color: #ecf0f1;
  }

  .map-selection {
    margin-top: 20px;
  }
</style>
<template>
  <div>

    <logo></logo>

    <div class="row">
      <div class="col-xs-12 title-col">
        <h2>
          Map Selection
        </h2>
        <router-link :to="{name: 'Home'}" class="back-button">
          <i class="icon ion-android-arrow-back"></i> Choose another game
        </router-link>
      </div>
    </div>

    <div
      class="row center-xs map-selection"
      v-show="maps && maps.length > 0"
    >
      <div
        v-for="map in maps"
        class="col-xs-12 col-sm-6 col-md-6 col-lg-4"
      >
        <div
          class="box map dropShadow"
          :style="`background-image:url(${map.thumbnail})`"
        >
          <router-link :to="{ name: 'Dashboard', params: {
            map: map.slug  
          }}">
            {{ map.name }}
          </router-link>
        </div>
      </div>
    </div>

    <p v-show="fetchingMaps">
      Loading maps...
    </p>

    <p v-show="!fetchingMaps && (!maps || maps.length === 0)">
      No maps found for this game.
    </p>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import Logo from '@/components/Logo'

  export default {
    name: 'MapSelection',
    components: { Logo },
    data () {
      return {
        maps: [],
        fetchingMaps: 0
      }
    },
    apollo: {
      maps: {
        query: gql`
          query GameMaps($game: String) {
            game: Game(slug: $game) {
              maps {
                id,
                name,
                slug,
                thumbnail
              }
            }
          }
        `,
        variables () {
          console.log('apollo this', this)
          return {
            game: this.$route.params.game || ''
          }
        },
        update (data) {
          return data.game.maps
        },
        loadingKey: 'fetchingMaps'
      }
    }
  }
</script>
