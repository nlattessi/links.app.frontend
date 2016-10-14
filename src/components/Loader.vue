<template>
	<div class="text-md-center">
		<img src="../assets/img/battery.gif" class="img-rounded" alt="loader">
		<p class="content">{{ message }}</p>
	</div>
</template>

<script>
  export default {
    props: [ 'message' ]
  }
</script>