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

  .add-button-container {
    padding: 20px;
  }

  .add-button {
    cursor: pointer;
    color: #fff;
    background-color: #CD9600;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 3px;
    text-decoration: none; 
  }

  .no-maps-found-container {
    padding: 20px;
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
            map: createLink(map.slug)
          }}">
            {{ map.name }}
          </router-link>
        </div>
      </div>
    </div>

    <p v-show="fetchingMaps">
      <loader></loader>
    </p>

    <p class="no-maps-found-container" v-show="!fetchingMaps && (!maps || maps.length === 0)">
      No maps found for this game.
    </p>

    <div class="add-button-container row center-xs">
      <router-link
        :to="{ name: 'MapSelectionAdd' }"
        class="add-button"
      >
        Add a map
      </router-link>
    </div>

    <modal
      v-if="$route.name !== 'MapSelection'"
      @close="$router.push({ name: 'MapSelection' })"
    >
      <router-view
        :user="user"
      ></router-view>
    </modal>

  </div>
</template>

<script>
  import Logo from '@/components/Logo'
  import Loader from '@/components/Loader'
  import Modal from '@/components/Modal'
  import QUERY_GAME_MAPS from '@/queries/QUERY_GAME_MAPS'
  import MUTATION_ADD_GAME from '@/queries/MUTATION_ADD_GAME'

  export default {
    name: 'MapSelection',
    components: { Logo, Loader, Modal },
    props: ['user'],
    data () {
      return {
        game: null,
        maps: [],
        fetchingMaps: 0
      }
    },

    apollo: {
      game: {
        query: QUERY_GAME_MAPS,
        variables () {
          return {
            game: this.$route.params.game || ''
          }
        },
        update (data) {
          return data.game ? data.game.id : null
        },
        result ({ data }) {
          if (!data.game && this.$route.params.name) {
            this.createGame(this.$route.params.name, this.$route.params.game)
          }
        }
      },
      maps: {
        query: QUERY_GAME_MAPS,
        variables () {
          return {
            game: this.$route.params.game || ''
          }
        },
        update (data) {
          return data.game ? data.game.maps : []
        },
        loadingKey: 'fetchingMaps'
      }
    },
    methods: {
      createLink (slug) {
        return slug.split('_').slice(-1)[0]
      },

      createGame (name, slug) {
        console.log('createGame', name, slug)
        this.$apollo.mutate({
          mutation: MUTATION_ADD_GAME,
          variables: {
            slug,
            name
          },
          update (store, { data: { createGame } }) {
            console.log('update', store, createGame)
            const data = store.readQuery({
              query: QUERY_GAME_MAPS,
              variables: {
                game: slug
              }
            })
            console.log('data', data)
            data.game = createGame
            store.writeQuery({ query: QUERY_GAME_MAPS, data })
          }
        })
      }
    }
  }
</script>
