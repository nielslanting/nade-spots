<style scoped>
  .video {
    overflow:hidden;
    padding-bottom:56.25%;
    position:relative;
    height:0;
  }
  .video .item,
  .video iframe {
    left:0;
    top:0;
    height:100%;
    width:100%;
    position:absolute;
    border: 0;
  }

  .embed-responsive-item { background-color: red; }
</style>

<template>
  <div class="video">
    <youtube
      class="item"
      player-width="100%"
      player-height="100%"
      :video-id="id"
      :mute="true"
      :player-vars="{
        autoplay: 1,
        start: start,
        end: end + 2,
        modestbranding: 1,
      }"
      @playing="handlePlaying"
    ></youtube>
  </div>
</template>


<script>
  export default {
    name: 'Player',
    props: ['id', 'start', 'end'],
    computed: {
      videoLength () {
        return this.end - this.start
      }
    },
    beforeDestroy () {
      if (this.resetVideoTimeout) {
        clearTimeout(this.resetVideoTimeout)
      }
    },
    methods: {
      handlePlaying (player) {
        clearTimeout(this.resetVideoTimeout)
        this.resetVideoTimeout = setTimeout(() => {
          player.seekTo(this.start, true)
        }, this.videoLength * 1000)
      }
    }
  }
</script>
