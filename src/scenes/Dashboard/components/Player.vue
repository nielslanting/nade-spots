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
      ref='youtube'
      class="item"
      player-width="100%"
      player-height="100%"
      :video-id="id"
      :mute="true"
      :player-vars="{
        autoplay: 1,
        start: start ? start : undefined,
        end: end ? (end + 2) : undefined,
        modestbranding: 1,
        iv_load_policy: 3
      }"
      @playing="handlePlaying"
    ></youtube>
  </div>
</template>


<script>
  export default {
    name: 'Player',
    props: ['id', 'start', 'end'],
    watch: {
      start () {

      },
      end () {

      }
    },
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

        if (!this.start || !this.end) return

        this.resetVideoTimeout = setTimeout(() => {
          player.seekTo(this.start, true)
        }, this.videoLength * 1000)
      }
    }
  }
</script>
