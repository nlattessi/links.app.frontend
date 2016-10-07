<template>
  <div v-for="alert in alertState.alerts" transition="fade" transition-mode="out-in">
    <alert :type="alert.type" :message="alert.message" :persist="alert.persist" :timeout="alert.timeout" @remove="removeAlert(alert)">
    </alert>
  </div>
</template>

<script>
  import alertService from '../alerts';
  import Alert from './Alert.vue';

  export default {
    components: { Alert },

    props: [ 'messages' ],

    data() {
      return {
        alertState: alertService.state
      }
    },

    methods: {
      removeAlert(alert) {
        alertService.removeAlert(alert);
      },
    }
  }
</script>