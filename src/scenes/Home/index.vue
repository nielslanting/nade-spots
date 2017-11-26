<style lang="scss" scoped>
  @import '~flexboxgrid-sass';

  .search {
    padding: 0;
    margin: 0 auto;

    &__content {
      text-align: center;
      display: flex;
      justify-content: center;
      padding-top: 70px;
      height: 100%;
      width: 100%;
      max-width: 500px;
      margin: auto;
    }
  }

  .popular-title {
    padding: 0;
    margin: 0 auto;

    &__content {
      text-align: left;
    }
  }

  .popular {
    &__item {
      margin-top: 10px;
      min-height: 300px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-position: center bottom;
      background-size: cover;
      background-repeat: no-repeat;

      a {
        height: 300px;
        vertical-align: middle;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: #ecf0f1;
        font-size: 0.9em;
        width: 100%;
        max-height: 300px;
        opacity: 0;
      }

      &:hover > a {
        opacity: 100;
        background-color: rgba(0, 0, 0, 0.7);
      }
    }
  }

  .title {
    font-size: 1.1em;
    color: #bdc3c7;
  }

  .drop-shadow
  {
      position:relative;
      box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  }
  .drop-shadow:before, .drop-shadow:after
  {
    content:"";
      position:absolute;
      z-index:-1;
      box-shadow:0 0 20px rgba(0,0,0,0.8);
      top:0;
      bottom:0;
      left:10px;
      right:10px;
      border-radius:100px / 10px;
  }
  .drop-shadow:after
  {
      right:10px;
      left:auto;
      transform:skew(8deg) rotate(3deg);
  }

</style>

<template>
  <div>

    <logo></logo>

    <h1 class="title">Learn nades the easy way.</h1>

    <!-- Search -->
    <div class="search row">
      <div class="search__content col-xs-12">
        <search-bar
          :keyword="keyword"
          :options="options"
          placeholder="Search a game"
          @input="handleKeywordChange"
          @select="handleOptionSelect"
        ></search-bar>
      </div>
    </div>

    <!-- Popular title -->
    <div class="popular-title row">
      <div class="col-xs-12">
        <div class="popular-title__content">
          <h2>
            Popular games:
          </h2>
        </div>
      </div>
    </div>

    <!-- Popular tiles -->
    <div class="popular row center-xs">
      <div
        class="col-xs-6 col-sm-3 col-md-2 col-lg-2"
        v-for="game in popularGames"
      >
        <div
          class="popular__item drop-shadow"
          :style="`background-image:url(${game.thumbnail})`"
        >
          <router-link :to="{ name: 'MapSelection', params: { game: game.slug } }">
            {{ game.title }}
          </router-link>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import _ from 'lodash'
  import slug from 'slug'
  import Loader from '@/components/Loader'
  import Logo from '@/components/Logo'
  import SearchBar from './components/SearchBar'

  const TWITCH_API_KEY = 'atdov855pxy9wlq6wbo6kg3w8psf01'

  export default {
    name: 'Search',
    components: {
      SearchBar,
      Loader,
      Logo
    },
    data () {
      return {
        keyword: '',
        searchValue: '',
        games: [],
        options: [],
        popularGames: [{
          title: 'Black Squad',
          slug: 'black-squad',
          thumbnail: 'https://www.nadespots.com/cdn/cjagnywjp02m101568bbio7v2'
        }, {
          title: 'S.K.I.L.L.: Special Force 2',
          slug: 'skill-special-force-2',
          thumbnail: 'https://www.nadespots.com/cdn/cjagny9z102lx0156ndgni4aj'
        }, {
          title: 'Counter Strike: Global Offensive',
          slug: 'counter-strike-global-offensive',
          thumbnail: 'https://www.nadespots.com/cdn/cjagnxfea02lt0156xkmwu3h6'
        }, {
          title: 'Alliance of Valiant Arms',
          slug: 'alliance-of-valiant-arms',
          thumbnail: 'https://www.nadespots.com/cdn/cjagnsw0002hv0183mtgpptw2'
        }, {
          title: 'Warface',
          slug: 'warface',
          thumbnail: 'https://www.nadespots.com/cdn/cjagnwp5l02lh0156fhqmva5p'
        }, {
          title: 'Line of Sight',
          slug: 'line-of-sight',
          thumbnail: 'https://www.nadespots.com/cdn/cjaa2otcp03y601419mel2kvj'
        }]
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
            game: gameSlug,
            name: option.title
          }
        })
      }
    }
  }
</script>
