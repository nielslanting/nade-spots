<style scoped>
  .centerSearch {
    text-align: center;
    display: flex;
    justify-content: center;
    padding-top: 70px;
    height: 100%;
    width: 100%;
    max-width: 500px;
    margin: auto;
  }

  .row {
    max-width: 1200px;
    padding: 0;
    margin: 0 auto;
  }

  .box.title {
    text-align: left;
  }

  .box.game {
    margin-top: 10px;
    background-color: #34495e;
    min-height: 200px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    width: 100px;
    transform: rotate(-15deg);
  }
</style>

<template>
  <div>
    <div>
      <img class="logo" src="../../assets/logo.svg" alt="Nadespots logo">
      <h1>
        Nade<em>spots</em>
      </h1>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="centerSearch">
          <search-bar
            :keyword="keyword"
            :options="options"
            placeholder="Search a game"
            @input="handleKeywordChange"
            @select="handleOptionSelect"
          ></search-bar>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <div class="box title">
          <h2>
            Popular games:
          </h2>
        </div>
      </div>
    </div>

    <div class="row center-xs">
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <div class="box game">
          <loader></loader>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <div class="box game">
          <loader></loader>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4">
        <div class="box game">
          <loader></loader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import slug from 'slug'
  import Loader from '@/components/Loader'
  import SearchBar from './components/SearchBar'

  const TWITCH_API_KEY = 'atdov855pxy9wlq6wbo6kg3w8psf01'

  export default {
    name: 'Search',
    components: {
      SearchBar,
      Loader
    },
    data () {
      return {
        keyword: '',
        searchValue: '',
        games: [],
        options: []
      }
    },
    computed: {
      fetchTwitchGames () {
        return _.debounce(this.doFetchTwitchGames, 300, { trailing: true })
      }
    },
    methods: {
      doFetchTwitchGames (query) {
        const twitchUrl = `https://api.twitch.tv/kraken/search/games?type=suggest&client_id=${TWITCH_API_KEY}&query=${query}`
        fetch(twitchUrl)
        .then((response) => {
          return response.json()
        })
        .then((result) => {
          console.log('twitchUrl', twitchUrl)
          console.log('result', result)

          this.options = result.games.map((game) => ({
            title: game.name,
            description: 'No description',
            thumbnail: game.box.small
          }))
        })
      },
      handleKeywordChange (value) {
        this.keyword = value
        this.fetchTwitchGames(this.keyword)
      },
      handleOptionSelect (option) {
        const gameSlug = slug(option.title).toLowerCase()

        this.$router.push({
          name: 'MapSelection',
          params: {
            game: gameSlug
          }
        })
      }
    }
  }
</script>
