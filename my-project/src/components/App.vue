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
          <li class="nav-item" v-if="user.authenticated">
            <a class="nav-link" href="#" @click="logout()">Logout</a>
          </li>
        </ul>
      </nav>
      <h3 class="text-muted">Links.app</h3>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data () {
    return {
      user: auth.user
    }
  },
  methods: {

    logout() {
      auth.logout()
    }

  }
}
</script>
