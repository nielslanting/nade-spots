<style scoped>
  .logo-container {
    text-align: left;
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
    border-bottom: 1px solid #7f8c8d;
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
</style>

<template>
  <div>
    <div class="logo-container">
      <logo :hideImage="true"></logo>

      <div class="row center-xs">
        <aside class="col-xs-12 col-sm-4 col-md-3 col-lg-3">
          <div class="box back-button">
            <router-link :to="{name: 'MapSelection'}">
              <i class="icon ion-android-arrow-back"></i> Map selection
            </router-link>
          </div>
          <div class="box add-button">
            <i class="icon ion-plus-round"></i> Add new
          </div>
          <div class="box side-menu">
            <div>
              <b>Type:</b>
              <br />
              <select>
                <option value="">Any</option>
                <option value="">Grenade</option>
                <option value="">Flash</option>
                <option value="">Smoke</option>
                <option value="">Grenade Launcher</option>
              </select>
            </div>

            <div>
              <b>Sorting:</b>
              <br />
              <select>
                <option value="">Rating</option>
                <option value="">Newest</option>
                <option value="">Oldest</option>
              </select>
            </div>
          </div>
        </aside>

        <main class="col-xs-12 col-sm-8 col-md-9 col-lg-9">
          <div class="box">
            <nade-map
              v-if="map && map.minimap"
              :name="$route.params.map"
              :minimap="map.minimap"
              :entries="map.entries"
              @click="handleMapClick"
            ></nade-map>
            <div class="loader-container" v-else>
              <loader></loader>
            </div>
          </div>
        </main>


        <modal
          v-if="$route.name === 'DashboardDetails'"
          @close="$router.push({ name: 'Dashboard' })"
        >
          <router-view :entries="entries"></router-view>
        </modal>
      </div>

    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import Logo from '@/components/Logo'
  import Modal from '@/components/Modal'
  import Loader from '@/components/Loader'
  import NadeMap from './components/NadeMap'

  export default {
    name: 'Dashboard',
    // data () {
    //   return {
    //     entries: [{
    //       id: 1,
    //       locations: [{
    //         x: 124.80555725097656,
    //         y: 199.1128463745117
    //       }, {
    //         x: 136.80555725097656,
    //         y: 111.61284637451172
    //       }],
    //       color: 'red',
    //       description: 'Line the right side of the vent up with the right side of the pole. Run forwards as soon as the pole disappears behind the vent, jump throw the grenade.',
    //       video: {
    //         id: 'YzqFUJGkjc4',
    //         start: 38,
    //         end: 44
    //       },
    //       title: 'Defensive mid window nade',
    //       author: 'Animosity',
    //       votes: {
    //         up: 1337,
    //         down: 666
    //       }
    //     }, {
    //       id: 2,
    //       locations: [{
    //         x: 95,
    //         y: 100
    //       }, {
    //         x: 65,
    //         y: 160
    //       }],
    //       color: 'red',
    //       description: 'Line the left side of the crosshair up with the left side of the pipe. Line the left side of the crosshair up with the right side of the lamp. Jump throw.',
    //       video: {
    //         id: 'YzqFUJGkjc4',
    //         start: 28,
    //         end: 37
    //       },
    //       title: 'Agressive B window nade',
    //       author: 'Animosity',
    //       votes: {
    //         up: 1337,
    //         down: 666
    //       }
    //     }, {
    //       id: 3,
    //       locations: [{
    //         x: 110,
    //         y: 158
    //       }, {
    //         x: 136.80555725097656,
    //         y: 111.61284637451172
    //       }],
    //       color: 'red',
    //       description: 'Place the crosshair in the center of the edges of the roof.',
    //       video: {
    //         id: 'YzqFUJGkjc4',
    //         start: 45,
    //         end: 50
    //       },
    //       title: 'Agressive mid window nade from connector',
    //       author: 'Animosity',
    //       votes: {
    //         up: 1337,
    //         down: 666
    //       }
    //     }]
    //   }
    // },
    components: { Logo, NadeMap, Modal, Loader },
    methods: {
      handleMapClick (id) {
        this.$router.push({
          name: 'DashboardDetails',
          params: {
            detailId: id
          }
        })
      }
    },
    computed: {
      entries () {
        if (!this.map || !this.map.entries) return []
        return this.map.entries
      }
    },
    apollo: {
      map: {
        query: gql`
          query EntriesForMap($map: String!) {
            map: Map(slug: $map) {
              id,
              minimap {
                url,
                size
              },
              entries {
                id,
                createdAt,
                description,
                downvotes,
                upvotes,
                locations {
                  x,
                  y
                },
                name,
                type {
                  id,
                  color
                },
                usage,
                video {
                  videoId,
                  start,
                  end
                }
              }
            }
          }
        `,
        variables () {
          return {
            map: this.$route.params.map
          }
        }
      }
    }
  }
</script>
