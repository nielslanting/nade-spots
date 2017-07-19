<template>
  <div>
    <h1>MapSelection</h1>
    <ul v-if="maps && maps.length > 0">
      <li v-for="map in maps">
        {{ map.name }}
      </li>
    </ul>
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
