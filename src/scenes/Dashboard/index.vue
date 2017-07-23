<style scoped>
  .logo-container {
    text-align: left;
  }

  main,
  aside {
    padding: 0;
    margin: 0;
  }
  .box {
    padding: 20px;
    margin: 5px;
    background-color: #34495e;
    text-align: left;
    border-radius: 3px;
  }

  .top-bar > div {
    margin: 0;
    padding: 0;
  }

  main > .box {
    position: relative;
  }

  a {
    display: block;
    text-decoration: none;
    color: #ecf0f1;
    height: 100%;
  }
  .back-button {
    background-color: #7f8c8d;
  }
  .add-button {
    background-color: #CD9600;
  }

  .side-menu > div {
    margin-bottom: 20px;
    padding: 10px;
    padding-left: 0;
    border-bottom: 1px solid #7f8c8d;
  }


  input,
  select {
    border: 0;
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 10px;
    margin-top: 10px;
    border-radius: 3px;
  }

</style>

<template>
  <div>
    <div class="logo-container">
      <logo :hideImage="true"></logo>

      <div class="row center-xs">
        <aside class="col-xs-12 col-sm-4 col-md-3 col-lg-3">
          <div class="box back-button">
            <router-link :to="{name: 'MapSelection'}">
              < Map selection
            </router-link>
          </div>
          <div class="box add-button">
            + Add new
          </div>
          <div class="box side-menu">
            <div>
              <b>Search:</b>
              <br />
              <input type="text" />
            </div>

            <div>
              <b>Type:</b>
              <br />
              <select>
                <option value="">Grenade</option>
                <option value="">Flash</option>
                <option value="">Smoke</option>
                <option value="">Grenade Launcher</option>
              </select>
            </div>

            <div>
              <b>Rating:</b>
              <br />
              <select>
                <option value="">*****</option>
                <option value="">****</option>
                <option value="">***</option>
                <option value="">**</option>
                <option value="">*</option>
              </select>
            </div>

            <div>
              <b>Sorting:</b>
              <br />
              <select>
                <option value="">Popular</option>
                <option value="">Recent Popular</option>
                <option value="">Newest</option>
              </select>
            </div>
          </div>
        </aside>

        <main class="col-xs-12 col-sm-8 col-md-9 col-lg-9">
          <div class="box">
            <nade-map
              :entries="entries"
              @click="handleMapClick"
            ></nade-map>
          </div>
        </main>


        <modal
          v-if="$route.name === 'DashboardDetails'"
          @close="$router.push({ name: 'Dashboard' })"
        >
          <router-view></router-view>
        </modal>
      </div>

    </div>
  </div>
</template>

<script>
  import Logo from '@/components/Logo'
  import Modal from '@/components/Modal'
  import NadeMap from './components/NadeMap'

  export default {
    name: 'Dashboard',
    data () {
      return {
        entries: [{
          id: 1,
          locations: [{
            x: 124.80555725097656,
            y: 199.1128463745117
          }, {
            x: 136.80555725097656,
            y: 111.61284637451172
          }],
          color: 'red'
        }, {
          id: 2,
          locations: [{
            x: 0,
            y: 0
          }, {
            x: 100,
            y: 100
          }],
          color: 'purple'
        }]
      }
    },
    components: { Logo, NadeMap, Modal },
    methods: {
      handleMapClick (id) {
        this.$router.push({
          name: 'DashboardDetails',
          params: {
            detailId: id
          }
        })
      }
    }
  }
</script>
