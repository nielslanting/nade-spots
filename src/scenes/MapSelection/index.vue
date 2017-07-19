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
</style>
<template>
  <div>
    <div class="row">
      <div class="col-xs-12 title-col">
        <h2>
          Map Selection
        </h2>
      </div>
    </div>

    <div
      class="row center-xs"
      v-if="maps && maps.length > 0"
    >
      <div
        v-for="map in maps"
        class="col-xs-6 col-sm-6 col-md-6 col-lg-4"
      >
        <div
          class="box map dropShadow"
          :style="`background-image:url(${map.thumbnail})`"
        >
          {{ map.name }}
        </div>
      </div>
    </div>
    <p v-else>
      No maps found for this game.
    </p>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'MapSelection',
    data () {
      return {
        maps: []
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
        }
      }
    }
  }
</script>
