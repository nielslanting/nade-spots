<style>
  input,
  select,
  textarea {
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    border: 0;
    background-color: #2c3e50;
    /*background-color: #34495e;*/
    color: #ecf0f1;
    padding: 10px;
    margin-top: 10px;
    border-radius: 3px;
    width: 100%;
  }

  .box {
    text-align: left;
    background-color: #34495e;
    margin-top: 10px;
    padding: 20px;
    border-radius: 3px;
  } 

  .box > div {
    padding-bottom: 10px;
    padding-top: 10px;
  }

  .default-button {
    text-decoration: none;
    background-color: #cd9600;
    color: #ecf0f1;
    border: 0;
    padding: 15px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 3px;
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    font-size: 1em;
    cursor: pointer;
  }

  .disabled-button {
    text-decoration: none;
    background-color: #7f8c8d;
    color: #ecf0f1;
    border: 0;
    padding: 15px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 3px;
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    font-size: 1em;
    cursor: not-allowed;
  }

  .next-button-container {
    margin: 30px;
  }

  .found-videos ul {
    padding: 0;
  }

  .found-videos li {
    list-style: none;
    height: 90px;
    margin: 10px;
  }

  .found-videos img {
    vertical-align: middle;
  }

  .video-item {
    max-height: 100px;
    padding: 5px;
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    border-radius: 3px;
  }

  .video-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .video-image {
    flex: 0 90px;
  }

  .video-padder {
    flex: 0 10px;
  }

  .video-description {
    flex: 1;
  }

  .slider {
    transform: translateY(-70px);
    border-radius: 3px;
  }

  .slider .vue-slider-tooltip {
    padding: 2px 3px;
    font-size: 10px;
  }

  @media (max-width: 678px) {
    a, button {
      width: 100%;
      display: inline-block;
    }
  }

</style>

<template>
  <div class="row input-row">
    <!-- Title -->
    <div class="col-xs-12"> 
      <h1>
        Select your video
      </h1>
    </div>

    <!-- Search -->
    <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4">
      <!-- Search Input -->
      <div class="box">
        Search on YouTube:
        <input type="text" v-model="query" @input="handleSearchInput">
      </div>

      <!-- Search Results -->
      <div class="box found-videos">
        <loader v-if="searchLoading"></loader>
        <span v-if="foundVideos.length === 0">No videos found.</span>
        <ul v-else>
          <li v-for="foundVideo in foundVideos" @click="selectVideo(foundVideo.id.videoId)">
            <div class="video-item">
              <div class="video-image">
                <img
                  :src="foundVideo.snippet.thumbnails.default.url"
                  :alt="foundVideo.snippet.title"
                  :width="foundVideo.snippet.thumbnails.default.width"
                  :height="foundVideo.snippet.thumbnails.default.height"
                >
              </div>
              <div class="video-padder"></div>
              <div class="video-description">
                {{ foundVideo.snippet.title }}
              </div>
            </div>
          </li> 
        </ul>
      </div>
    </div>

    <!-- Current video url -->
    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
      <div class="box">
        Enter YouTube video id or url here:
        <input type="text" v-model="video">
      </div>

      <!-- Video player -->
      <div class="box">
        <player
          v-if="video && video.length > 0"
          ref="player"
          :id="video"
          :start="parseInt(start, 10)"
          :end="parseInt(end, 10)"
          @playing="handleVideo"
          @ready="handleVideo"
        ></player>
        <span v-else>
          Select a video.
        </span>
        <vue-slider
          v-if="end > 0"
          class="slider"
          ref="slider"
          :value="sliderValues"
          tooltip="always"
          :formatter="(x) => { return toHHMMSS(x) }"
          :min="min"
          :max="max"
          :tooltipDir="['top', 'bottom']"
          @drag-end="handleDragEnd"
        ></vue-slider>
      </div>

      <div class="box" v-show="false">
        <button
          v-if="!recording"
          @click="handleStartRecord"
        >
          Record
        </button> 
        <button
          v-else
          @click="handleStopRecord"
        >
          Stop recording
        </button>
      </div>
    </div>

    <!-- Current video editor -->
    <div class="col-xs-12 center-xs">
      <div class="next-button-container">
        <a
          class="disabled-button"
          v-if="valid"
        >
          <i class="icon ion-alert-circled"></i>
          Enter the required fields
        </a>

        <a
          v-else
          href=""
          class="default-button"
          @click.prevent.stop="addEntry"
        >
          <i class="icon ion-checkmark"></i>
          Create entry
        </a>

      </div>
    </div>

  </div>
</template>

<script>
  import gql from 'graphql-tag'
  import { debounce } from 'lodash'
  import VueSlider from 'vue-slider-component'
  import Loader from '@/components/Loader'
  import ENTRIES_FOR_MAP from '@/queries/ENTRIES_FOR_MAP'
  import Player from '../../components/Player'

  const API_KEY = 'AIzaSyC-XJtt6icSgqZDMdZzdt3648vOa_GT9jE'

  export default {
    name: 'Content',
    props: ['map', 'user'],
    components: { Loader, Player, VueSlider },
    data () {
      return {
        query: 'Animosity black squa',
        video: '',
        start: null,
        end: null,
        valid: false,
        foundVideos: [],
        searchLoading: false,
        max: 100,
        min: 0,
        recording: false,
        recordingStart: 0
      }
    },
    mounted () {
      // TODO: Validate params
    },
    computed: {
      doSearch () {
        return debounce(this.search, 400, { trailing: true })
      },
      sliderValues () {
        const start = this.start == null ? 0 : this.start
        const end = this.end == null ? 0 : this.end
        return [parseInt(start, 10), parseInt(end, 10)]
      }
    },
    methods: {
      search () {
        this.searchLoading = true
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${API_KEY}&q=${this.query}`

        fetch(searchUrl)
        .then(data => data.json())
        .then((data) => {
          this.searchLoading = false
          console.log('youtube data', data)
          this.foundVideos = data.items
        })
      },
      handleSearchInput () {
        this.doSearch()
      },
      selectVideo (videoId) {
        this.video = videoId
      },
      handleVideo (player) {
        console.log('handleVideo', player)
        if (!player) return

        const duration = Math.round(player.getDuration())
        console.log('handleVideoDuration', duration)
        if (duration && this.end !== duration && (this.end === 0 || this.end == null)) this.end = duration
        if (duration && this.max !== duration) this.max = duration
      },
      handleDragEnd (e) {
        this.start = e.currentValue[0]
        this.end = e.currentValue[1]
      },
      toHHMMSS (secs) {
        var secNum = parseInt(secs, 10)
        var hours = Math.floor(secNum / 3600) % 24
        var minutes = Math.floor(secNum / 60) % 60
        var seconds = secNum % 60

        return [hours, minutes, seconds]
        .map(v => v < 10 ? '0' + v : v)
        .filter((v, i) => v !== '00' || i > 0)
        .join(':')
      },
      handleStartRecord () {
        this.recording = true
        this.recordingStart = this.$refs.player.getCurrentTime()
      },
      handleStopRecord () {
        this.recording = false

        // Only set the nade when the user recorded long enough
        if (this.$refs.player.getCurrentTime() - this.recordingStart > 3) {
          this.start = this.recordingStart
          this.end = this.$refs.player.getCurrentTime()
        }
        this.recordingStart = null
      },
      addEntry () {
        const mapId = this.$route.params.map
        this.$apollo.mutate({
          mutation: gql`
            mutation addEntry(
              $description: String!,
              $name: String!,
              $usage: USAGE!,
              $videoId: String!,
              $videoStart: Int!,
              $videoEnd: Int!,
              $map: ID!,
              $type: ID!,
              $locations: Json!,
              $userId: ID!,
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
                userId: $userId                
              ) {
                id,
                createdAt,
                description,
                downvotes,
                upvotes,
                locations,
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
                },
                user {
                  name
                }
              }
            }
          `,
          variables: Object.assign({}, this.$route.params, {
            videoId: this.video,
            videoStart: this.start ? parseInt(this.start, 10) : undefined,
            videoEnd: this.end ? parseInt(this.end, 10) : undefined,
            map: this.map.id,
            userId: this.user.id
          }),
          update (store, { data: { createEntry } }) {
            console.log('update', store, createEntry, this)
            const data = store.readQuery({
              query: ENTRIES_FOR_MAP,
              variables: {
                map: mapId
              }
            })
            console.log('data', data)
            data.map.entries.push(createEntry)
            store.writeQuery({ query: ENTRIES_FOR_MAP, data })
          }
        })
        .then((data) => {
          console.log('addEntry success', data)
          this.$router.push({ name: 'Dashboard' })
        })
        .catch((error) => {
          console.error('addEntry error', error)
        })
      }
    }
  }
</script>
