<style>
  #disqus_thread a { color: #cd9600; }
</style>

<style scoped>
  .details-menu {
    margin: 0;
    padding: 0;
  }

  .details-content {
    margin: 0;
    padding: 0;
    max-width: 1200px;
  }

  .details-container {
    text-align: left;
  }

  .details-header {
    height: 40px;
    line-height: 40px;
  }

  .details-header h1,
  .details-header h2 {
    float: left;
    vertical-align: bottom;
    margin: 5px;
    padding: 0;
  }

  .details-header h1 {
    font-size: 1.4em;
    text-transform: uppercase;
  }

  .details-header h2 {
    font-size: 1em;
    color: #bdc3c7;
  }

  .details {
    width: 100%;
    height: calc(100% - 60px);
    margin: 0;
    padding: 0;
  }

  .box {
    background-color: #2c3e50;
    border-radius: 3px;
  }

  aside .box {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .details-content {
    margin: 0;
    padding: 0;
  }

  .details-content .box {
    height: 100%;
  }

  .row {
    margin: 0;
    margin: 0;
  }

  .details-menu .row > div {
    padding: 0;
  }
  .details-menu .row > div > div,
  .details-content > div {
    border-radius: 3px;
    /*background-color: #2c3e50;*/
    margin: 10px;
    /*padding: 15px;*/
  }

  .upvote {
    background-color: #2ecc71;
    cursor: pointer;
  }

  .upvote:hover {
    background-color: #3BD97E;
  }

  .downvote {
    background-color: #e74c3c;
    cursor: pointer;
  }

  .downvote:hover {
    background-color: #F45949;
  }

  .button {
    background-color: #ecf0f1;
    color: #2c3e50;
  }

  .content {
    background-color: #2c3e50;
  }

  .description { text-align: left; }
</style>

<template>
  <div class="details-container" v-if="entry">
    <div class="details-header">
      <h1>{{ entry.name || '' }}</h1>
      <h2>By {{ entry.user && entry.user.name ?  entry.user.name : 'unknown' }}</h2>
    </div>

    <div class="details row center-xs left-md">
      <!-- Side menu -->
      <div class="details-menu col-xs-12 col-sm-12 col-md-12 col-lg-3 last-xs last-sm last-md">
        <div class="row center-xs">
<!--           <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="button">
              <i class="icon ion-social-youtube"></i> Video
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div class="button">
              <i class="icon ion-image"></i> Images
            </div>
          </div>
 -->
<!--           <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div class="upvote" @click="upvote">
              <i class="icon ion-arrow-up-a"></i> {{ entry.upvotes || '0' }}
            </div>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div class="downvote" @click="downvote">
              <i class="icon ion-arrow-down-a"></i> {{ entry.downvotes || '0' }}
            </div>
          </div>
 -->
          <div
            v-if="entry && entry.description"
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 first-xs first-sm first-md last-lg"
          >
            <div class="content description">
              <h3>Description</h3>
              {{ entry.description || '' }}
            </div>
          </div>

          <div
            class="col-xs-12 col-sm-12 col-md-12 col-lg-12 first-xs first-sm first-md last-lg"
          >
            <div class="content description">
              <h3>Discussion</h3>
              <vue-disqus
                shortname="nadespots"
                url="https://www.nadespots.com"
                :identifier="this.$route.params.detailId"
              ></vue-disqus>
            </div>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="details-content col-xs-12 col-sm-12 col-md-12 col-lg-9 last-lg">
        <div class="content">
          <player
            v-if="entry && entry.video && entry.video.videoId"
            :id="entry.video.videoId"
            :start="entry.video.start"
            :end="entry.video.end"
          ></player>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import MUTATION_ADD_UPVOTE_ON_USER from '@/graphql/MUTATION_ADD_UPVOTE_ON_USER'
  import MUTATION_ADD_DOWNVOTE_ON_USER from '@/graphql/MUTATION_ADD_DOWNVOTE_ON_USER'
  import Player from '../components/Player'

  export default {
    name: 'Details',
    props: ['entries', 'user'],
    components: { Player },
    computed: {
      entry () {
        if (!this.entries) return null
        return this.entries.filter(x => x.id === this.$route.params.detailId)[0]
      }
    },
    methods: {
      upvote () {
        this.$apollo.mutate({
          mutation: MUTATION_ADD_UPVOTE_ON_USER,
          variables: {
            user: this.user.id,
            entry: this.entry.id
          }
        })
      },
      downvote () {
        this.$apollo.mutate({
          mutation: MUTATION_ADD_DOWNVOTE_ON_USER,
          variables: {
            user: this.user.id,
            entry: this.entry.id
          }
        })
      }
    }
  }
</script>
