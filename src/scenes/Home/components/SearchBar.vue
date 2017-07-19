<style scoped>
  
  input {
    max-width: 500px;
    width: 100%;
    background-color: #34495e;
    color: #ecf0f1;
    border: 0;
    padding: 20px;
    border-radius: 3px;
    box-sizing: border-box;
  }

  .autocomplete-input {
    position: relative;
    height: 160px;
    width: 100%;
  }

  ul.options-list {
    display: flex;
    flex-direction: column;
    margin-top: -12px;
    border: 2px solid #2980b9;
    border-radius: 0 0 3px 3px;
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    overflow: hidden;
    list-style-type: none;
    padding: 0;
    overflow-y: scroll;
    overflow-x: hidden;
    max-height: 300px;
    border-radius: 3px;
    z-index: 1;
    background-color: #2c3e50;
  }

  ul.options-list li {
    display: inline-block;
    width: 100%;
    flex-wrap: wrap;
    background: #34495e;
    margin: 0;
    border-bottom: 2px solid #2c3e50;
    color: #ecf0f1;
    padding: 7px;
    cursor: pointer;
  }

  ul.options-list li.highlighted {
    background: #2980b9
  }

  .media {
    display: flex;
    align-items: center;
    text-align: left;
  }

  .media strong {
    font-weight: 200;
  }

  .media figure {
    padding: 0;
    margin: 0;
  }

  .media-left {
    margin-right: 1rem;
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .media-right {
    margin-left: 1rem;
  }

  .image.is-64x64 {
    width: 64px;
    height: 64px;
  }

  .image img {
    display: block;
    height: auto;
    width: 100%;
    max-width: 100%;
  }

  p.image {
    padding: 0;
    margin: 0;
  }

</style>

<template>
  <div class="autocomplete-input">
    <p class="control has-icon has-icon-right">
      <input
        class="input is-large"
        :value="keyword"
        :placeholder="this.placeholder || 'Search'"
        @input="onInput($event.target.value)"
        @keyup.esc="isOpen = false"
        @blur="isOpen = false"
        @keydown.down="moveDown"
        @keydown.up="moveUp"
        @keydown.enter="select"
      />
      <i class="fa fa-angle-down"></i>
    </p>
    <ul v-show="isOpen" class="options-list">
      <li
        v-for="(option, index) in fOptions"
        :class="{'highlighted': index === highlightedPosition}"
        @mouseenter="highlightedPosition = index"
        @mousedown="select"
      >
        <article class="media">
          <figure class="media-left">
            <p class="image">
              <img :src="option.thumbnail">
            </p>
          </figure>
          <p class="media-right">
            <strong>{{ option.title }}</strong>
          </p>
        </article>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',
    data () {
      return {
        isOpen: false,
        highlightedPosition: 0
      }
    },
    props: {
      keyword: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      },
      placeholder: {
        type: String,
        required: false
      }
    },
    computed: {
      fOptions () {
        const re = new RegExp(this.keyword, 'i')
        return this.options.filter(o => o.title.match(re))
      }
    },
    methods: {
      onInput (value) {
        this.$emit('input', value)
        this.highlightedPosition = 0
        this.isOpen = !!value
      },
      moveDown () {
        if (!this.isOpen) {
          return
        }
        this.highlightedPosition =
          (this.highlightedPosition + 1) % this.fOptions.length
      },
      moveUp () {
        if (!this.isOpen) {
          return
        }
        this.highlightedPosition = this.highlightedPosition - 1 < 0 ? this.fOptions.length - 1 : this.highlightedPosition - 1
      },
      select () {
        const selectedOption = this.fOptions[this.highlightedPosition]
        this.$emit('select', selectedOption)
        this.isOpen = false
        this.keyword = selectedOption.title
      }
    }
  }
</script>
