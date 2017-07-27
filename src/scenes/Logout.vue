<template>
  <div>
    <loader></loader> 
    Logging out...
  </div>  
</template>

<script>
  import Loader from '@/components/Loader'

  export default {
    name: 'Logout',
    components: { Loader },
    created () {
      localStorage.removeItem('profile')
      localStorage.removeItem('auth0IdToken')
      window.location.reload(true)
    }
  }
</script>
