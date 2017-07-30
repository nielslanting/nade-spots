<style scoped>
  input,
  select,
  textarea {
    border: 0;
    /*background-color: #2c3e50;*/
    background-color: #34495e;
    color: #ecf0f1;
    padding: 10px;
    margin-top: 10px;
    border-radius: 3px;
  }

  .box {
    text-align: left;
    /*background-color: #34495e;*/
    background-color: #2c3e50;
    margin-top: 10px;
    padding: 10px;
    border-radius: 3px;
  } 

  .box > div {
    padding-bottom: 10px;
    padding-top: 10px;
  }

  .box textarea {
    width: 100%;
    min-height: 140px;
  }

  .box .video {
    min-height: 250px;
  }

  .input-row .box {
    min-height: 200px;
  }
</style>

<template>
  <div>
    <h1>Add nade</h1>

    <div class="row center-xs bottom-xs input-row">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="box">
          <div>
            Name: <br />
            <input v-model="name">
          </div>
          <div>
            Type: <br />
            <select @change="handleTypeChange">
              <option 
                v-for="type in types" :value="type.id"
              >
                {{ type.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="box">
          Description: <br />
          <textarea v-model="description"></textarea>
        </div>
      </div>
    </div>

    <div class="row center-xs">
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="box">
          <player
            :id="videoId"
            :start="parseInt(videoStart)"
            :end="parseInt(videoEnd)"
          ></player>
          <div>
            VideoId: 
            <input v-model="videoId">
          </div>

          <div>
            VideoStart(seconds): 
            <input v-model="videoStart">
          </div>

          <div>
            VideoEnd(seconds): 
            <input v-model="videoEnd">
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
        <div class="box">
          <nade-map
            v-if="minimap"
            :name="$route.params.map"
            :minimap="minimap"
            :entries="[entry]"
            @click="handleMapClick"
            @rightclick="handleMapRightClick"
          ></nade-map>
          <button @click="handleMapRightClick">Reset</button>
        </div>
      </div>
    </div>
    <button @click="handleCreate">Create</button>
  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import Player from '../components/Player'
  import NadeMap from '../components/NadeMap'

  export default {
    name: 'Add',
    components: { Player, NadeMap },
    props: ['map', 'types', 'minimap'],
    data () {
      return {
        name: '',
        description: '',
        videoId: 'Fdd1eyY94Mo',
        videoStart: '',
        videoEnd: '',
        locations: [],
        type: this.types[0]
      }
    },
    computed: {
      entry () {
        return {
          type: this.type,
          locations: this.locations
        }
      }
    },
    methods: {
      handleCreate () {
        this.addEntry()
      },
      handleTypeChange (e) {
        console.log('handleTypeChange', e, e.target.selectedIndex)
        this.type = this.types[e.target.selectedIndex]
      },
      handleMapClick (e) {
        const location = {
          x: e.da.x,
          y: e.da.y
        }

        console.log('handleMapClick', location)
        this.locations.push(location)
      },
      handleMapRightClick () {
        this.locations = []
      },
      addEntry () {
        this.$apollo.mutate({
          mutation: gql`
            mutation addEntry(
              $description: String!,
              $name: String!,
              $usage: ENTRY_USAGE!,
              $videoId: String!,
              $videoStart: Int!,
              $videoEnd: Int!,
              $map: ID!,
              $type: ID!,
              $locations: Json!
            ) {
              createEntry(
                description: $description,
                name: $name,
                usage: $usage,
                mapId: $map,
                typeId: $type,
                locations: $locations,
                video: {
                  videoId: $videoId,
                  start: $videoStart,
                  end: $videoEnd
                },
              ) {
                id,
                name,
                description,
                usage
                video {
                  id,
                  videoId
                }
              }
            }
          `,
          variables: {
            description: this.description,
            name: this.name,
            usage: 'GENERAL',
            locations: this.locations,
            videoId: this.videoId,
            videoStart: this.videoStart ? parseInt(this.videoStart, 10) : undefined,
            videoEnd: this.videoEnd ? parseInt(this.videoEnd, 10) : undefined,
            map: this.map.id, // Castle
            type: this.types[0].id // Grenade (M67)
          }
        })
        .then((data) => {
          console.log('addEntry success', data)
        })
        .catch((error) => {
          console.error('addEntry error', error)
        })
      }
    }
  }
</script>
