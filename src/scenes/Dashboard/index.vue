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
            <router-link :to="{name: 'DashboardAdd'}">
              <i class="icon ion-plus-round"></i> Add new
            </router-link>
          </div>
          <div class="box side-menu">
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
              :entries="entries"
              @click="handleMapClick"
            ></nade-map>
            <div class="loader-container" v-else>
              <loader></loader>
            </div>
          </div>
        </main>


        <modal
          v-if="$route.name !== 'Dashboard'"
          @close="$router.push({ name: 'Dashboard' })"
        >
          <router-view
            :entries="entries"
            :map="map"
            :types="types"
          ></router-view>
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
    components: { Logo, NadeMap, Modal, Loader },
    data () {
      return {
        selectedType: null
      }
    },
    methods: {
      handleMapClick (id) {
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
      }
    },
    computed: {
      entries () {
        if (!this.map || !this.map.entries) return []

        // Filter entries on type
        if (this.selectedType) {
          return this.map.entries.filter(x => x.type.id === this.selectedType)
        }

        return this.map.entries
      },
      types () {
        if (!this.map || !this.map.entries) return []
        return this.map.entries
        .map(x => x.type)
        .filter((v, i, s) => s.indexOf(v) === i)
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
                  name
                  color,
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
