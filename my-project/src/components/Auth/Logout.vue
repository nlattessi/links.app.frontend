<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card card-block">
        <h3 class="card-title text-md-center">Thank you for using Links.app!</h3>
        
        <hr>
        
        <div class="text-md-center" transition="fade">
          <img src="./../../assets/battery.gif" class="img-rounded" alt="...">
          <p class="content">Login out...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../../auth';

  export default {
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
