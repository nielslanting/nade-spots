<style lang="scss" scoped>
  .map-title {
    &__content {
      text-align: left;
    }

    &__back-button {
      color: #bdc3c7;
      background-color: #34495e;
      padding: 5px;
      border-radius: 3px;
      text-decoration: none; 
      padding-left: 10px;
      padding-right: 10px;
    }

    &__backback-button:hover {
      color: #ecf0f1;
    }
  }

  .map-selection {
    margin-top: 20px;

    &__item {
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

      a {
        display: block;
        height: 100%;
        text-decoration: none;
        color: #ecf0f1;
        font-size: 0.9em;
        width: 100%;
        line-height: 150px;
        max-height: 150px;
      }

      &:hover > a {
        background-color: rgba(0, 0, 0, 0.7);
      }

    }
  }

  .add-map {
    padding: 20px;

    &__button {
      cursor: pointer;
      color: #fff;
      background-color: #CD9600;
      padding: 10px;
      padding-left: 20px;
      padding-right: 20px;
      border-radius: 3px;
      text-decoration: none; 
    }
  }

  .no-maps-found {
    padding: 20px;
  }

  .drop-shadow
  {
      position:relative;
      box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  }
  .drop-shadow:before, .drop-shadow:after
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
  .drop-shadow:after
  {
      right:10px; 
      left:auto; 
      transform:skew(8deg) rotate(3deg);
  }

</style>
<template>
  <div>

    <logo></logo>

    <!-- Title box -->
    <div class="map-title row">
      <div class="map-title__content col-xs-12 ">
        <h2>
          Map Selection
        </h2>

        <router-link :to="{name: 'Home'}" class="map-title__back-button">
          <i class="icon ion-android-arrow-back"></i> Choose another game
        </router-link>
      </div>
    </div>

    <!-- Map view -->
    <div
      class="map-selection row center-xs"
      v-show="maps && maps.length > 0"
    >
      <div
        v-for="map in maps"
        class="col-xs-12 col-sm-6 col-md-6 col-lg-4"
      >
        <div
          class="map-selection__item box dropShadow"
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

    <!-- Loader -->
    <p v-show="fetchingMaps">
      <loader></loader>
    </p>

    <!-- No maps found -->
    <p class="no-maps-found" v-show="!fetchingMaps && (!maps || maps.length === 0)">
      No maps found for this game.
    </p>

    <!-- Add button -->
    <div class="add-map row center-xs">
      <router-link
        :to="{ name: 'MapSelectionAdd' }"
        class="add-map__button"
      >
        Add a map
      </router-link>
    </div>

    <!-- Add map modal -->
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
  import QUERY_GAME_MAPS from '@/graphql/QUERY_GAME_MAPS'
  import MUTATION_ADD_GAME from '@/graphql/MUTATION_ADD_GAME'

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
