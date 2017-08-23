<style scoped>
  input,
  select,
  textarea {
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    border: 0;
    background-color: #2c3e50;
    /*background-color: #34495e;*/
    color: #ecf0f1;
    padding: 10px;
    margin-top: 10px;
    border-radius: 3px;
    width: 100%;
  }

  .input-row {
  } 

  .box {
    text-align: left;
    background-color: #34495e;
    margin-top: 10px;
    padding: 20px;
    border-radius: 3px;
  } 

  .box > div {
    padding-bottom: 10px;
    padding-top: 10px;
  }

  .box textarea {
    min-height: 140px;
  }

  .map-container {
    text-align: center;
  }

  .reset-button {
    text-decoration: none;
    width: 100%;
    background-color: #e74c3c;
    color: #ecf0f1;
    border: 0;
    padding: 15px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 3px;
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    font-size: 1em;
    cursor: pointer;
  }

  .next-button {
    text-decoration: none;
    background-color: #cd9600;
    color: #ecf0f1;
    border: 0;
    padding: 15px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 3px;
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    font-size: 1em;
    cursor: pointer;
  }

  .disabled-button {
    text-decoration: none;
    background-color: #7f8c8d;
    color: #ecf0f1;
    border: 0;
    padding: 15px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 3px;
    font-family: Montserrat, Helvetica, Arial, sans-serif;
    font-size: 1em;
    cursor: not-allowed;
  }

  .reset-button-container {
    margin-top: 10px;
  }

  .next-button-container {
    margin: 30px;
  }
</style>

<template>
  <div class="row input-row">
    <div class="col-xs-12">
      <h1>
        Add a new nade
      </h1>
    </div>

    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <div class="box">
        <!-- Name -->
        <div>
          Name: <br />
          <input
            v-model="name"
            placeholder="A descriptive name like: Nade from A to Mid"
          >
        </div>

        <!-- Type -->
        <div>
          Type: <br />
          <select @change="handleTypeChange">
            <option 
              v-for="type in types" :value="type.id"
            >
              {{ type.name }}
            </option>
          </select>
        </div>

        <!-- Usage -->
        <div>
          Usage: <br />
          <select @change="handleUsageChange">
            <option 
              v-for="usage in usages" :value="usage"
            >
              {{ usage }}
            </option>
          </select>
        </div>

        <!-- Description -->
        <div>
          Description: <br />
          <textarea
            v-model="description"
            placeholder="Where do we need to look? When do we need to throw? Do we need to run and jump?"
          ></textarea>
        </div>
      </div>
    </div>

    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 center-xs">
      <div class="box map-container">
        <span>
          Draw a line by clicking on the map 
        </span>
        <nade-map
          v-if="minimap"
          :name="$route.params.map"
          :minimap="minimap"
          :entries="entry.type && [entry]"
          :draggable="false"
          @click="handleMapClick"
          @rightclick="handleMapRightClick"
        ></nade-map>
        <div class="reset-button-container">
          <a href="" class="reset-button" @click.prevent.stop="handleMapRightClick">
            <i class="icon ion-ios-loop-strong"></i>
            Reset
          </a>
        </div>
      </div>
    </div>
    <div class="col-xs-12 center-xs">
      <div class="next-button-container">
        <a
          class="disabled-button"
          v-if="$v.$invalid"
        >
          <i class="icon ion-alert-circled"></i>
          Enter the required fields
        </a>

        <router-link
          v-else
          class="next-button"
          :to="{
            name: 'DashboardAddContent',
            params: {
              name: this.name,
              description: this.description,
              locations: this.locations,
              type: this.type || this.types[0].id,
              usage: this.usage || this.usages[0]
            }
          }"
        >
          <i class="icon ion-checkmark"></i>
          Next step      
        </router-link>

      </div>
    </div>
  </div>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators'
  import NadeMap from '../../components/NadeMap'

  export default {
    name: 'AddDetails',
    props: ['types', 'usages', 'minimap'],
    components: { NadeMap },
    data () {
      return {
        name: '',
        description: '',
        type: null,
        usage: null,
        locations: []
      }
    },
    computed: {
      entry () {
        return {
          type: this.types.filter(x => x.id === this.type)[0] || this.types[0],
          locations: this.locations
        }
      }
    },
    methods: {
      handleUsageChange (e) {
        this.usage = this.usages[e.target.selectedIndex]
      },
      handleTypeChange (e) {
        console.log('handleTypeChange', e, e.target.selectedIndex)
        this.type = this.types[e.target.selectedIndex].id
      },
      handleMapClick (e) {
        console.log('handleMapClick', e)

        const location = {
          x: e.ea.x,
          y: e.ea.y
        }

        console.log('handleMapClick', location)
        this.locations.push(location)
      },
      handleMapRightClick () {
        this.locations = []
      }
    },
    validations: {
      name: {
        required
      },
      locations: {
        required,
        minLength: minLength(2)
      }
    }
  }
</script>
