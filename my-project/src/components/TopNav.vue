<template>
  <div class="container">
    <div class="header clearfix">
      <nav>
        <ul class="nav nav-pills pull-xs-right">
          <li class="nav-item" v-if="!user.authenticated">
            <a class="nav-link" v-link="'/login'">Login</a>
          </li>
          <li class="nav-item" v-if="!user.authenticated">
            <a class="nav-link" v-link="'/register'">Register</a>
          </li>
          <li class="nav-item" v-if="user.authenticated">
            <a class="nav-link" v-link="'/home'">Home</a>
          </li>
          <!--<li class="nav-item" v-if="user.authenticated">
            <button type="button" class="btn btn-outline-primary" @click="showNewCategoryModal = true">Add Category</button>
          </li>-->
          <!--<li class="nav-item" v-if="user.authenticated">
            <button type="button" class="btn btn-outline-primary" @click="showNewLinkModal = true">Add Link</button>
          </li>-->
          <li class="nav-item" v-if="user.authenticated">
          <a class="nav-link"  v-link="'/logout'">Logout</a>
        </li>

          <!--<li class="nav-item" v-if="user.authenticated">
            <a class="nav-link" v-link="'/home'" @click="refreshToken()">Refresh Token</a>
          </li>-->

          <!--<li class="nav-item">
            <a href="#" @click="currentView = 'create'" class="nav-link" v-bind:class="{ 'active': createView }">Create</a>
          </li>

          <li class="nav-item">
            <a href="#" @click="currentView = 'home'" class="nav-link" v-bind:class="{ 'active': homeView }">Home</a>
          </li>-->
        </ul>
      </nav>
      <h3 class="text-muted">Links.app</h3>
    </div>
  </div>
</template>

<script>
    export default {
      // props: [ 'currentView' ],
      props: [ 'user' ],
        // computed: {
        //     loggedIn () {
        //         return true
        //     },
        //     createView () {
        //       return this.currentView === 'create'
        //     },
        //     homeView () {
        //       return this.currentView === 'home'
        //     }
        // }
    }
</script>