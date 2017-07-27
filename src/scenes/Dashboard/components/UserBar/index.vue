<style>
  .auth0-lock-social-button[data-provider="oauth2"] {
    background-color: #6441A4 !important; 
  }

  .auth0-lock-social-button[data-provider^=oauth2] .auth0-lock-social-button-icon {
    background-image: url('./assets/twitch_icon.svg') !important;
  }
</style>

<style scoped>
  .logout-button {
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

  .login-button {
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
    margin-right: 8px;
  }

  .username-container {
    text-align: center;
  }

  .user-bar {
    background-color: #34495e;
    border-radius: 3px;
    width: 100%;
    padding: 0px;
    margin: auto 0px;
  }

  .user-bar div{
    margin: 0;
    padding: 0;
  }

</style>

<template>
  <div v-if="!user" class="row end-xs">
    <div class="row end-xs">
      <button
        class="login-button"
        @click="login"
      >
        <i class="icon ion-log-in"></i>
        Login
      </button>
    </div>
  </div>

  <div v-else class="row middle-xs">
    <div class="user-bar row middle-xs">
      <div class="username-container col-xs-6 middle-xs">
        {{ user.name}}
      </div>
      <div class="col-xs-6 middle-xs">
        <button
          class="logout-button"
          @click="logout"
        >
          <i class="icon ion-log-out"></i>
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Auth0Lock from 'auth0-lock'
  import gql from 'graphql-tag'
  import logo from '@/assets/logo.svg'

  const AUTH0_CLIENT_ID = 'GwNOClBkpC2TiE0dcDUGWroXexizYxr3'
  const AUTH0_DOMAIN = 'nadespots.eu.auth0.com'

  function checkAuth () {
    return !!localStorage.getItem('id_token')
  }

  export default {
    name: 'UserBar',
    data () {
      return {
        user: null,
        lock: new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
          autoclose: true,
          auth: {
            responseType: 'token',
            redirect: false
            // redirectUrl: `${window.location.origin}/callback?returnUrl=${window.location.href}`
          },
          theme: {
            logo: logo,
            primaryColor: '#34495e',
            labeledSubmitButton: false
          },
          socialButtonStyle: 'small'
        })
      }
    },
    mounted () {
      Vue.nextTick(() => {
        this.authenticated = checkAuth()

        this.lock.on('authenticated', (authResult) => {
          console.log('authenticated', authResult)
          localStorage.setItem('auth0IdToken', authResult.idToken)
          this.lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
              // Handle error
              return
            }

            console.log('auth0 profile', profile)

            // Set the token and user profile in local storage
            localStorage.setItem('profile', JSON.stringify(profile))

            this.$apollo.query(this.$apollo.queries.user.options)
            .then((data) => {
              console.log('Got user', data)
              if (this.user) {
                // Login
                console.log('everything gucci')
              } else {
                const name = profile.given_name || profile.nickname || profile.name || profile.email
                const picture = profile.picture
                this.createUser(authResult.idToken, profile.email, name, picture)
              }
            })
            .catch((error) => {
              console.log('Didnt gfet user', error)
            })
          })
        })
        this.lock.on('authorization_error', (error) => {
          // handle error when authorizaton fails
          console.log('Auth0 error', error)
          return
        })
      })
    },
    methods: {
      login () {
        this.lock.show()
      },
      logout () {
        localStorage.removeItem('profile')
        localStorage.removeItem('auth0IdToken')
        window.location.reload()
      },
      createUser (idToken, email, name, picture) {
        const createUser = gql`
          mutation ($idToken: String!, $name: String!, $email: String!, $picture: String!){
            createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, email: $email, picture: $picture) {
              id,
              name,
              picture
            }
          }
        `
        return this.$apollo.mutate({
          mutation: createUser,
          variables: {
            idToken: idToken,
            name: name,
            email: email,
            picture: picture
          }
        })
        .then((result) => {
          console.log('createUser result: ', result)
          this.user = result.data.createUser
        })
      }
    },
    apollo: {
      user: {
        fetchPolicy: 'network-only',
        query: gql`
          query {
            user {
              id,
              name,
              picture
            }
          }
        `
      }
    }
  }
</script>
