<style scoped>
  .logo-container {
    text-align: left;
  }

  .logo-container .row {
    margin: 0;
  }

  main,
  aside {
    padding: 0;
    margin: 0;
  }
  .box {
    padding: 20px;
    margin: 5px;
    background-color: #34495e;
    text-align: left;
    border-radius: 3px;
  }

  .top-bar > div {
    margin: 0;
    padding: 0;
  }

  main > .box {
    position: relative;
  }

  a {
    display: block;
    text-decoration: none;
    color: #ecf0f1;
    height: 100%;
  }
  .back-button {
    background-color: #7f8c8d;
  }
  .add-button {
    background-color: #CD9600;
  }

  .side-menu > div {
    margin-bottom: 20px;
    padding: 10px;
    padding-left: 0;
    /*border-bottom: 1px solid #7f8c8d;*/
  }

  input,
  select {
    border: 0;
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 10px;
    margin-top: 10px;
    border-radius: 3px;
  }

  .loader-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .user-bar-container {
    padding: 5px;
  }

  .legend-box {
    padding: 0;
    text-align: center;
    overflow-y: hidden;
    overflow-x: auto;
  }

  .legend-box > .box {
    text-align: center;
  }

  .legend-item {
    display: inline-block;
    font-size: 0.7em;
    margin-left: 10px;
    margin-right: 10px;
  }

  .legend-circle {
    float: left;
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: black;
    border-radius: 1000px;
    margin-right: 10px;
  }

</style>

<template>
  <div>
    <div class="logo-container">
      <div class="row middle-xs">
        <!-- Logo container -->
        <div class="col-xs-12 col-sm-4 col-md-6 col-lg-6">
          <logo :hideImage="true"></logo>
        </div>

        <!-- Filler -->
        <div class="col-xs-0 col-sm-3 col-md-1 col-lg-1"></div>

        <!-- User container -->
        <div class="col-xs-12 col-sm-5 col-md-5 col-lg-5 end-xs user-bar-container">
          <user-bar
            ref="userBar"
            :user="user"
          ></user-bar>
        </div>
      </div>

      <div class="row center-xs">
        <aside class="col-xs-12 col-sm-4 col-md-3 col-lg-3">

          <!-- Back button -->
          <div class="box back-button">
            <router-link :to="{name: 'MapSelection'}">
              <i class="icon ion-android-arrow-back"></i> Map selection
            </router-link>
          </div>

          <!-- Add button -->
          <div class="box add-button">
            <router-link
              v-if="user"
              :to="{ name: 'DashboardAddDetails' }"
            >
              <i class="icon ion-plus-round"></i>
              Add new
            </router-link>
            <a 
              v-else
              href=""
              @click.prevent.stop="login"
            >
              <i class="icon ion-plus-round"></i>
              Login to add new
            </a>
          </div>

          <!-- Side menu -->
          <div class="box side-menu">

            <!-- Type Filter -->
            <div>
              <b>Type:</b>
              <br />
              <select @change="handleTypeChange">
                <option value="">Any</option>
                <option 
                  v-for="type in types" :value="type.id"
                >
                  {{ type.name }}
                </option>
              </select>
            </div>

            <!-- Usage Filter -->
            <div>
              <b>Usage:</b>
              <br />
              <select @change="handleUsageChange">
                <option value="">All</option>
                <option value="GENERAL">General</option>
                <option value="OFFENSIVE">Offensive</option>
                <option value="DEFENSIVE">Defensive</option>
              </select>
            </div>
          
          </div>
        </aside>

        <!-- Main map view -->
        <main class="col-xs-12 col-sm-8 col-md-9 col-lg-9">
          <div class="box">
            <nade-map
              v-if="map && minimap"
              :name="$route.params.map"
              :minimap="minimap"
              :entries="entries"
              @open="handleMapOpen"
            ></nade-map>
            <div class="loader-container" v-else>
              <loader></loader>
            </div>
          </div>
        </main>

        <!-- Legend -->
        <div class="legend-box col-xs-12 col-sm-offset-4 col-sm-8 col-md-offset-3 col-md-9 col-lg-offset-3 col-lg-9">
          <div class="box">
            <div class="legend-item" v-for="type in types">
              <div class="legend-circle" :style="`background-color: ${type.color}`"></div>
              {{ type.name }}
            </div>
          </div>
        </div>

        <modal
          v-if="$route.name !== 'Dashboard'"
          @close="$router.push({ name: 'Dashboard' })"
        >
          <router-view
            :entries="entries"
            :map="map"
            :types="types"
            :minimap="minimap"
            :user="user"
          ></router-view>
        </modal>
      </div>

    </div>
  </div>
</template>

<script>
  import Logo from '@/components/Logo'
  import Modal from '@/components/Modal'
  import Loader from '@/components/Loader'
  import QUERY_ENTRIES_FOR_MAP from '@/queries/QUERY_ENTRIES_FOR_MAP'
  import QUERY_GAME_TYPES from '@/queries/QUERY_GAME_TYPES'
  import NadeMap from './components/NadeMap'
  import UserBar from './components/UserBar'

  export default {
    name: 'Dashboard',
    props: ['user'],
    components: { Logo, NadeMap, Modal, Loader, UserBar },
    data () {
      return {
        selectedType: '',
        selectedUsage: '',
        map: null,
        types: []
      }
    },
    methods: {
      handleMapOpen (id) {
        this.$router.push({
          name: 'DashboardDetails',
          params: {
            detailId: id
          }
        })
      },
      handleTypeChange (e) {
        console.log('handleTypeChange', e)
        this.selectedType = e.target.value
      },
      handleUsageChange (e) {
        this.selectedUsage = e.target.value
      },
      login () {
        this.$refs.userBar.login()
      }
    },
    computed: {
      entries () {
        if (!this.map || !this.map.entries) return []

        let entries = this.map.entries

        // Filter entries on type
        if (this.selectedType) {
          entries = entries.filter(x => x.type.id === this.selectedType)
        }

        // Filter entries on usage
        if (this.selectedUsage) {
          entries = entries.filter(x => x.usage === this.selectedUsage)
        }

        return entries
      },
      minimap () {
        if (!this.map) return null

        return {
          url: this.map.minimap,
          size: this.map.minimapSize
        }
      }
    },
    apollo: {
      types: {
        query: QUERY_GAME_TYPES,
        variables () {
          return {
            game: this.$route.params.game
          }
        },
        update (data) {
          return data.game.types
        }
      },
      map: {
        query: QUERY_ENTRIES_FOR_MAP,
        variables () {
          return {
            map: `${this.$route.params.game}_${this.$route.params.map}`
          }
        }
      }
    }
  }
</script>
