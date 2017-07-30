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
      <div class="box">
        <loader v-if="searchLoading"></loader>
        <span v-if="foundVideos.length === 0">No videos found.</span>
        <ul v-else>
          <li v-for="foundVideo in foundVideos">
            <img
              :src="foundVideo.snippet.thumbnails.default.url"
              :alt="foundVideo.snippet.title"
              :width="foundVideo.snippet.thumbnails.default.width"
              :height="foundVideo.snippet.thumbnails.default.height"
            >
            {{ foundVideo.snippet.title }}
          </li> 
        </ul>
      </div>
    </div>

    <!-- Current video url -->
    <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8">
      <div class="box">
        Search for a video, or enter an url here:
        <input type="text" v-model="video">
      </div>

      <div class="box">
        Select a video.
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

        <router-link
          class="default-button"
          :to="{ name: 'DashboardAddContent' }"
          v-else
        >
          <i class="icon ion-checkmark"></i>
          Next step      
        </router-link>

      </div>
    </div>

  </div>
</template>

<script>
  import { debounce } from 'lodash'
  import Loader from '@/components/Loader'

  const API_KEY = 'AIzaSyC-XJtt6icSgqZDMdZzdt3648vOa_GT9jE'

  export default {
    name: 'Content',
    components: { Loader },
    data () {
      return {
        query: 'kaas',
        video: '',
        valid: false,
        foundVideos: [],
        searchLoading: false
      }
    },
    computed: {
      doSearch () {
        return debounce(this.search, 400, { trailing: true })
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
      }
    }
  }
</script>
