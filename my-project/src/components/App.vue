<template>
  <div>
    <top-nav :user.sync="user"></top-nav>
    <div class="container">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <alert :alerts.sync="alerts"></alert>
        </div>
      </div>
      <router-view transition="fade" transition-mode="out-in" :alerts="alerts"></router-view>
    </div>
  </div>
</template>

<script>
  import auth from '../auth';
  import Alert from './Alert.vue';
  import TopNav from './TopNav.vue';

  export default {
    components: { Alert, TopNav },

    data () {
      return {
        user: auth.user,
        alerts: []
      }
    },

    ready () {
      this.alerts.push({
        type: 'success',
        message: 'Category added!'
      });
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