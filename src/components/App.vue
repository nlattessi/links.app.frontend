<template>
  <div>
    <top-nav :user.sync="user"></top-nav>
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <alert-list></alert-list>
        </div>
      </div>
      <router-view transition="fade" transition-mode="out-in"></router-view>
    </div>
  </div>
</template>

<script>
  import auth from '../auth';
  import AlertList from './Alerts/AlertList.vue';
  import TopNav from './Nav/TopNav.vue';

  export default {
    components: { AlertList, TopNav },

    data() {
      return {
        user: auth.user
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