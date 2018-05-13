<style>
  .video {
    overflow: hidden;
    padding-bottom: 56.25% !important;
    position: relative;
    height: 0;
    border: 1px solid black;
  }
  .video .item,
  .video iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
    border: 0;
  }

  .embed-responsive-item { background-color: red; }
</style>

<template>
  <div class="video">
    <youtube
      v-if="!refreshPlayer"
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
      @ready="$emit('ready')"
    ></youtube>
  </div>
</template>


<script>
  export default {
    name: 'Player',
    props: ['id', 'start', 'end'],
    data () {
      return {
        refreshPlayer: false
      }
    },
    watch: {
      start () { this.refresh() },
      end () { this.refresh() }
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
      refresh () {
        this.refreshPlayer = true
        this.$nextTick(() => {
          this.refreshPlayer = false
        })
      },
      handlePlaying (player) {
        this.$emit('playing', player)
        clearTimeout(this.resetVideoTimeout)

        if (!this.start || !this.end) return

        this.resetVideoTimeout = setTimeout(() => {
          player.seekTo(this.start, true)
        }, this.videoLength * 1000)
      },
      getCurrentTime () {
        return this.$refs.youtube.player.getCurrentTime()
      },
      getDuration () {
        return this.$refs.youtube.player.getDuration()
      }
    }
  }
</script>
