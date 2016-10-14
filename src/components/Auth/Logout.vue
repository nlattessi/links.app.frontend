<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card card-block">
        <h3 class="card-title text-md-center">Thank you for using Links.app!</h3>
        
        <hr>
        
        <div transition="fade">
          <loader message="Login out..."></loader>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../../auth';
  
  import Loader from '../Loader.vue';

  export default {
    components: {
      Loader
    },

    methods: {
      logout() {
        setTimeout(() => {
          auth.logout();
          this.$router.go('/login');
        }, 1000)
      }
    },

    ready() {
      this.logout();
    }
  }
</script>
