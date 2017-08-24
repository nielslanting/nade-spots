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
    padding: 0;
    margin: 0 auto;
  }

  .box.title {
    text-align: left;
  }

  .box.game {
    margin-top: 10px;
    min-height: 300px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: center bottom;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .box.game > a {
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

  .box.game:hover > a {
    opacity: 100;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .dropShadow
  {
      position:relative;
      box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  }
  .dropShadow:before, .dropShadow:after
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
  .dropShadow:after
  {
      right:10px; 
      left:auto; 
      transform:skew(8deg) rotate(3deg);
  }

  .generalDescription {
    padding: 20px;
    margin: 5px;
    background-color: #34495e;
    border-radius: 3px;
    letter-spacing: 0.02em;
    margin-bottom: 50px;
  }
</style>

<template>
  <div>

    <logo></logo>

    <div class="row">
      <div class="col-xs-12">
        <div class="centerSearch">
<!--           <search-bar
            :keyword="keyword"
            :options="options"
            placeholder="Search a game"
            @input="handleKeywordChange"
            @select="handleOptionSelect"
          ></search-bar>
 -->        
          <span class="generalDescription">
            Nadespots is an easy tool to learn nadespots/setnades for your favorite games!
            Start by selecting your game:
          </span>
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
      <div
        class="col-xs-6 col-sm-3 col-md-2 col-lg-2"
        v-for="game in popularGames"
      >
        <div
          class="box game dropShadow"
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
          thumbnail: 'https://static-cdn.jtvnw.net/ttv-boxart/Black%20Squad-272x380.jpg'
        }, {
          title: 'S.K.I.L.L.: Special Force 2',
          slug: 'skill-special-force-2',
          thumbnail: 'https://static-cdn.jtvnw.net/ttv-boxart/S.K.I.L.L.:%20Special%20Force%202-272x380.jpg'
        }, {
          title: 'Counter Strike: Global Offensive',
          slug: 'counter-strike-global-offensive',
          thumbnail: 'https://static-cdn.jtvnw.net/ttv-boxart/Counter-Strike:%20Global%20Offensive-272x380.jpg'
        }, {
          title: 'Alliance of Valiant Arms',
          slug: 'alliance-of-valiant-arms',
          thumbnail: 'http://i.imgur.com/91lkMZv.png'
        }, {
          title: 'Warface',
          slug: 'warface',
          thumbnail: 'https://static-cdn.jtvnw.net/ttv-boxart/Warface-272x380.jpg'
        }, {
          title: 'Crossfire',
          slug: 'crossfire',
          thumbnail: 'https://static-cdn.jtvnw.net/ttv-boxart/CrossFire-272x380.jpg'
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
            game: gameSlug
          }
        })
      }
    }
  }
</script>
