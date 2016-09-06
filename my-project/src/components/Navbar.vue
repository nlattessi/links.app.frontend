<template>
  <div class="navbar">
  <ul>
    <li><a href="">Links.App</a></li>
    <template v-if="isLogged === false">
      <li style="float:right;"><a v-link="{ path: '/login' }">Login</a></li>
      <li style="float:right;"><a v-link="{ path: '/register' }">Register</a></li>
    </template>
    <template v-else>
      <li style="float:right;"><a v-link="{ path: '/login' }">Logout</a></li>
    </template>

  </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLogged: false
    }
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }
  
  li {
    float: left;
  }
  
  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  
  li a:hover {
    background-color: #111;
  }
</style>