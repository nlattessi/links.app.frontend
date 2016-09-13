<template>
  <top-nav :user.sync="user"></top-nav>
  <div class="container">
    <router-view transition="fade" transition-mode="out-in" :show-new-category-modal.sync="showNewCategoryModal" :show-new-link-modal.sync="showNewLinkModal"></router-view>
    <!--<component :is="currentView" transition="fade" transition-mode="out-in"></component>-->
  </div>
</template>

<!--<template>
  <div>
    <top-nav></top-nav>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </div>
</template>-->

<script>
  import auth from '../auth'
  import TopNav from './TopNav.vue'

  // import Home from './Home.vue'
  // import Create from './Create.vue'

  export default {

    components: { TopNav },

    data () {
      return {
        // currentView: 'home',
        user: auth.user,
        showNewCategoryModal: false,
        showNewLinkModal: false
      }
    },
    methods: {

      logout() {
        auth.logout()
        // this.$router.go('/')
        console.log('logout')
        if (this.$route.auth) this.$route.router.go('/login')
      },

    },

    // ready () {
    //   this.$on('userLoggedOut', () => {
    //     this.logout();
    //   })
    // }

    events: {
      'userLoggedOut': 'logout'
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

<style>
  .fade-transition {
    transition: opacity 0.2s ease;
  }
  
  .fade-enter,
  .fade-leave {
    opacity: 0;
  }
</style>