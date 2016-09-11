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
            <button type="button" class="btn btn-outline-primary" @click="showNewCategoryModal = true">Add Category</button>
          </li>
          <li class="nav-item" v-if="user.authenticated">
            <button type="button" class="btn btn-outline-primary" @click="showNewLinkModal = true">Add Link</button>
          </li>
          <li class="nav-item" v-if="user.authenticated">
            <a class="nav-link" href="#" @click="logout()">Logout</a>
          </li>
        </ul>
      </nav>
      <h3 class="text-muted">Links.app</h3>
    </div>
    <router-view :show-new-category-modal.sync="showNewCategoryModal" :show-new-link-modal.sync="showNewLinkModal">
    </router-view>

    <!--<router-view></router-view>-->
    <!--<new-category-modal :show.sync="showNewCategoryModal"></new-category-modal>-->
  </div>
</template>

<script>
  import auth from '../auth'
  // import NewCategoryModal from './NewCategoryModal'

  export default {

    components: {
      // NewCategoryModal
    },

    data () {
      return {
        user: auth.user,
        showNewCategoryModal: false,
        showNewLinkModal: false
      }
    },
    methods: {

      logout() {
        auth.logout()
      }

    }

    // events: {
    //   'addedCategory': function(msg) {
    //     console.log('on addedCategory')
    //     console.log(msg)
    //     this.$broadcast('addedCategory', msg)
    //   }
    // }
  }
</script>