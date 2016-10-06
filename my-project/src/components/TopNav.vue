<template>
  <div class="container">
    <div class="header clearfix">
      <nav>
        <ul class="nav nav-pills pull-xs-right">
          <li class="nav-item" v-if="user.authenticated">
            <a class="nav-link" v-link="'/links'">Links</a>
          </li>
          <li class="nav-item" v-if="user.authenticated">
            <a class="nav-link" v-link="'/create/category'">Add Category</a>
          </li>
          <li class="nav-item" v-if="user.authenticated">
            <a class="nav-link" v-link="'/create/link'">Add Link</a>
          </li>
          <li class="nav-item" v-if="user.authenticated">
            <a class="nav-link" v-link="'/logout'">Logout</a>
          </li>
        </ul>
      </nav>
      <h3 class="text-muted">Links.app</h3>
    </div>
  </div>
</template>

<script>
  export default {
    props: [ 'user' ]
  }
</script>