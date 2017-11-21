<style lang="scss" scoped>
  .add-map {
    height: 100%; 
  } 
  
  .box {
    text-align: left;
    background-color: #34495e;
    margin-top: 10px;
    padding: 20px;
    border-radius: 3px;
  }

  input,
  .thumbnailDropzone,
  .mapDropzone {
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    border: 0;
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 10px;
    margin-top: 10px;
    border-radius: 3px;
    width: 100%;
  }

  .submit {
    margin: 20px;

    &__button {
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
  }
  
  .login-button {
    margin-left: 8px;
    margin-right: 8px;
  }
</style>

<style>
  .dz-image-preview {
    border-radius: 2px;
  }
</style>

<template>
  <div class="add-map">

    <div class="row">
      <div class="col-xs-12">
        <h1>
          Add a new map
        </h1>
      </div> 
    </div>

    <div class="login-button">
      <user-bar></user-bar>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="box">

          Map Name:
          <input
            type="text"
            placeholder="Map name"
            v-model="name"
          >
        </div>
      </div> 
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-6">
        <div class="box">

          Thumbnail:
          <dropzone
            id="thumbnailDropzone"
            class="thumbnailDropzone"
            url="https://api.graph.cool/file/v1/cj59tz3nfrlhy0105885qy550"
            param-name="data"
            :use-font-awesome="true"
            :max-number-of-files="1"
            @vdropzone-success="thumbnailSuccess"
          ></dropzone>

        </div>
      </div> 

      <div class="col-xs-12 col-md-6">
        <div class="box">

          Map:
          <dropzone
            id="mapDropzone"
            class="mapDropzone"
            url="https://api.graph.cool/file/v1/cj59tz3nfrlhy0105885qy550"
            param-name="data"
            :use-font-awesome="true"
            :max-number-of-files="1"
            :resize-width="1024"
            :resize-height="1024"
            @vdropzone-success="minimapSuccess"
          ></dropzone>

        </div>
      </div> 
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="submit">
          <button class="submit__button" v-if="user">
            Upload
          </button>
          <button
            v-else
            class="submit__button"
            @click="showLock"
          >
            Signin first
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Dropzone from 'vue2-dropzone'
  import Lock from '@/services/lock'
  import UserBar from '@/components/UserBar'

  export default {
    name: 'AddMap',
    components: { Dropzone, UserBar },
    props: ['user'],
    data () {
      return {
        name: '',
        thumbnail: null,
        minimap: null,
        lock: Lock
      }
    },
    mounted () {
      if (!this.user) this.lock.show()
    },
    methods: {
      thumbnailSuccess (file, jsonResult) {
        const result = JSON.parse(jsonResult)
        this.thumbnail = result.url
      },
      minimapSuccess (file, jsonResult) {
        const result = JSON.parse(jsonResult)
        this.minimap = result.url
      },
      showLock () {
        this.lock.show()
      }
    }
  }
</script>
