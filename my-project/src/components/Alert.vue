<template>
  <div v-for="alert in alerts" transition="fade" transition-mode="out-in">
    <div class="alert alert-{{ alert.type }} alert-dismissible fade in" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" v-on:click="remove(alert)">
        <span aria-hidden="true">&times;</span>
      </button> {{ alert.message }}
    </div>
  </div>
</template>

<script>
  export default {
    props: [ 'alerts' ],

    methods: {
      remove (alert) {
        this.alerts.$remove(alert);
      }
    }
  }
</script>