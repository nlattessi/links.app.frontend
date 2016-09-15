<template>
  <div>
    <top-nav :user.sync="user"></top-nav>
    <div class="container">
      <router-view transition="fade" transition-mode="out-in"></router-view>
    </div>
  </div>
</template>

<script>
  import auth from '../auth';
  import TopNav from './TopNav.vue';

  export default {
    components: { TopNav },

    data () {
      return {
        // authenticated: auth.authenticated
        user: auth.user
      }
    },

    methods: {
      login: function() {
        auth.login();
      }
    }
  }
</script>

<style>
  .fade-transition {
    transition: opacity 0.2s ease;
  }
  
  .fade-enter,
  .fade-leave {
    opacity: 0;
  }
</style>