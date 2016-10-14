<template>
  <div class="alert alert-{{type}} alert-dismissible fade in" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="$emit('remove')">
        <span aria-hidden="true">&times;</span>
      </button> {{message}}
  </div>
</template>

<script>
  export default {
    props: [ 'type', 'message', 'persist', 'timeout' ],

    ready() {
      if (this.timeout !== 0) {
        setTimeout(() => {
          this.$emit('remove');
        }, this.timeout);
      }
    }
  }
</script>