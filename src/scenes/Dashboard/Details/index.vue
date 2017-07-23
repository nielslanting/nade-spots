<style scoped>
  .details-menu,
  .details-content {
    margin: 0;
    padding: 0;
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
    padding: 15px;
  }

  .upvote {
    background-color: #2ecc71;
  }

  .downvote {
    background-color: #e74c3c;
  }

  .button {
    /*background-color: #2c3e50;*/
    background-color: #ecf0f1;
    color: #2c3e50;
  }

  .content {
    background-color: #2c3e50;
  }

</style>

<template>
  <div class="details-container">
    <div class="details-header">
      <h1>Nade title</h1>
      <h2>By Animosity</h2>
    </div>

    <div class="details row center-xs">
      <!-- Side menu -->
      <div class="details-menu col-xs-12 col-sm-4 col-md-3 col-lg-3">
        <div class="row center-xs">
          <div class="col-xs-6 col-sm-12 col-md-12 col-lg-12">
            <div class="button">
              Video
            </div>
          </div>
          <div class="col-xs-6 col-sm-12 col-md-12 col-lg-12">
            <div class="button">
              Images
            </div>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div class="upvote">
              Up
            </div>
          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div class="downvote">
              Down
            </div>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="details-content col-xs-12 col-sm-8 col-md-9 col-lg-9">
        <div class="content">

          <youtube id="YzqFUJGkjc4"></youtube>

           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dapibus purus diam, non ornare nibh congue nec. Aliquam quis molestie arcu. Sed mollis dictum lorem, vitae rhoncus nulla pretium ut. Proin at nulla laoreet, interdum dolor ut, fermentum augue. Nunc gravida erat at tristique accumsan. Suspendisse luctus congue est, non efficitur elit blandit non. Etiam suscipit convallis dignissim. Aenean placerat, libero quis gravida tincidunt, felis magna suscipit dui, eu mattis ligula diam a est.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Youtube from './components/Youtube'

  export default {
    name: 'Details',
    components: { Youtube }
  }
</script>
