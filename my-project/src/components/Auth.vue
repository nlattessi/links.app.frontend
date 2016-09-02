<template>
<p>
    <!-- use v-link directive for navigation. -->
    <a v-link="{ path: '/login' }">Go to Login</a>
    <a v-link="{ path: '/register' }">Go to Register</a>
  </p>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Login'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>



