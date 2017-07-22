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
            <nade-map></nade-map>
          </div>
        </main>
      </div>

    </div>
  </div>
</template>

<script>
  import Logo from '@/components/Logo'
  import NadeMap from './components/NadeMap'

  export default {
    name: 'Dashboard',
    components: { Logo, NadeMap }
  }
</script>
