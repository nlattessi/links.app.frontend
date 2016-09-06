<template>
  <navbar></navbar>
  <div id="app">
    <!--<img class="logo" src="./assets/logo.png">
    <hello></hello>
    <a v-link="{ path: '/home' }">Go to Foo</a>
    <a v-link="{ path: '/about' }">Go to Bar</a>
    <p>
      Welcome to your Vue.js app!
    </p>-->
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Hello from './components/Hello'

export default {
  data: function () {
    return {
      name: 'VueJs'
    }
  },
  ready () {
    // Run when component is initialized and ready
  },
  components: {
    Navbar,
    Hello
  }
}
</script>