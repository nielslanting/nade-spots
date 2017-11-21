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

  .thumbnailDropzone.vue-dropzone:hover,
  .mapDropzone.vue-dropzone:hover {
    background-color: #233140;
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
            :options="{
              autoQueue: false,
              url: 'https://api.graph.cool/file/v1/cj59tz3nfrlhy0105885qy550',
              paramName: 'data',
              useFontAwesome: true,
              maxNumberOfFiles: 1,
            }"
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
            ref="mapDropzone"
            :options="{
              autoQueue: false,
              url: 'https://api.graph.cool/file/v1/cj59tz3nfrlhy0105885qy550',
              paramName: 'data',
              useFontAwesome: true,
              maxNumberOfFiles: 1,
              resizeWidth: 1024,
              resizeHeight: 1024,
              resizeQuality: 1.0,
              resizeMethod: 'contain'
            }"
            @vdropzone-success="minimapSuccess"
            @vdropzone-processing="handleProcessing"
            @vdropzone-file-added="handleFileAdded"
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
  import 'vue2-dropzone/dist/vue2Dropzone.css'
  import Lock from '@/services/lock'
  import UserBar from '@/components/UserBar'

  const base64ToFile = (dataURI, origFile) => {
    let byteString, mimestring

    if (dataURI.split(',')[0].indexOf('base64') !== -1) {
      byteString = atob(dataURI.split(',')[1])
    } else {
      byteString = decodeURI(dataURI.split(',')[1])
    }

    mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

    const content = []
    for (let i = 0; i < byteString.length; i++) {
      content[i] = byteString.charCodeAt(i)
    }

    const newFile = new File(
      [new Uint8Array(content)], origFile.name, {type: mimestring}
    )

    // Copy props set by the dropzone in the original file
    var origProps = [
      'upload', 'status', 'previewElement', 'previewTemplate', 'accepted'
    ]

    origProps.forEach((p) => {
      newFile[p] = origFile[p]
    })

    return newFile
  }

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
      },
      handleProcessing (file) {
        console.log('handleProcessing', file)
      },
      handleFileAdded (origFile) {
        console.log('handleFileAddedl', origFile)

        const dropzone = this.$refs.mapDropzone.dropzone
        const reader = new FileReader()

        const newWidth = dropzone.options.resizeWidth
        const newHeight = dropzone.options.resizeHeight

        // Convert file to img
        reader.addEventListener('load', (event) => {
          const origImg = new Image()
          origImg.src = event.target.result

          origImg.addEventListener('load', (event) => {
            let width = event.target.width
            let height = event.target.height

            // Calc new dims otherwise
            if (width > height) {
              height *= newWidth / width
              width = newWidth
            } else {
              width *= newHeight / height
              height = newHeight
            }

            // Resize
            const canvas = document.createElement('canvas')
            canvas.width = newWidth
            canvas.height = newHeight

            const ctx = canvas.getContext('2d')
            ctx.fillStyle = 'grey'
            ctx.fillRect(0, 0, newWidth, newHeight)

            const newX = (newWidth - width) / 2
            const newY = (newHeight - height) / 2
            ctx.drawImage(origImg, newX, newY, width, height)

            const resizedFile = base64ToFile(canvas.toDataURL(), origFile)

            // Replace original with resized
            const origFileIndex = dropzone.files.indexOf(origFile)
            dropzone.files[origFileIndex] = resizedFile

            // Enqueue added file manually making it available for
            // further processing by dropzone
            dropzone.enqueueFile(resizedFile)
          })
        })

        reader.readAsDataURL(origFile)
      }
    }
  }
</script>
