<style lang="scss" scoped>
  .disclaimer {
    text-align: left;

    & a {
      text-decoration: none;
      color: #cd9600;
    }

    &__logo {
      text-align: center;
    }

    &__box {
      padding: 20px;
      background-color: #34495e;
      text-align: left;
      border-radius: 3px;
    }

    &__back {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
</style>

<template>
  <div class="disclaimer row">
    <div class="col-xs-12">
      <div class="disclaimer__logo">
        <logo></logo>
      </div>

      <div class="disclaimer__back">
        <router-link :to="{ name: 'Home' }">
          <i class="icon ion-android-arrow-back"></i> Back to home
        </router-link>
      </div>

      <div class="disclaimer__box">
        <h2>
          Disclaimer
        </h2>

        <p>
          <b>
            Last updated: November 22, 2017
          </b>
        </p>

        <p>
          The information contained on <a href="https://www.nadespots.com">https://www.nadespots.com</a> website (the "Service") is for general information purposes only.
        </p>

        <p>
          Nadespots assumes no responsibility for errors or omissions in the contents on the Service.
        </p>

        <p>
          In no event shall Nadespots be liable for any special, direct, indirect, consequential, or incidental damages or any damages whatsoever, whether in an action of contract, negligence or other tort, arising out of or in connection with the use of the Service or the contents of the Service. Nadespots reserves the right to make additions, deletions, or modification to the contents on the Service at any time without prior notice.
        </p>

        <p>
          Nadespots does not warrant that the website is free of viruses or other harmful components.
        </p>


        <h2>
          External links disclaimer
        </h2>

        <p>
          <a href="https://www.nadespots.com">https://www.nadespots.com</a> website may contain links to external websites that are not provided or maintained by or in any way affiliated with Nadespots
        </p>

        <p>
          Please note that the Nadespots does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
        </p>
      </div>

      <div class="disclaimer__back">
        <router-link :to="{ name: 'Home' }">
          <i class="icon ion-android-arrow-back"></i> Back to home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Logo from '@/components/Logo'

  export default {
    name: 'Disclaimer',
    components: { Logo }
  }
</script>
