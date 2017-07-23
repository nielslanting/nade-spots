<style scoped>
  .video {
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 */
    border: 0;
  }
</style>

<template>
  <iframe
    class="video"
    :src="video"
  ></iframe>
</template>


<script>
  export default {
    name: 'Youtube',
    props: ['id'],
    computed: {
      video () {
        return `https://youtube.com/embed/${this.id}`
      }
    }
  }
</script>
