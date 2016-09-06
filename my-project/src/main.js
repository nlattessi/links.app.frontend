    import Vue from 'vue'
    import App from './App'
    import VueRouter from 'vue-router'
    import VueResource from 'vue-resource'

import Login from './components/Login'
import Register from './components/Register'

    Vue.use(VueResource)
    Vue.use(VueRouter)

    /* eslint-disable no-new */
    // new Vue({
    //   el: 'body',
    //   components: { App }
    // })

    var router = new VueRouter({
      hashbang: false,
      history: true,
      linkActiveClass: 'active-class'
    })

    // Define some components
    var Foo = Vue.extend({
      template: '<p>This is foo!</p>'
    })

    var Bar = Vue.extend({
      template: '<p>This is bar!</p>'
    })

    /* Route Map */
    router.map({
        // '*': {
        // component: {
        //     template: '<h1>Not Found</h1>'
        // },
      '/home': {
        component: {
            template: '<p>Home</p>'
        }
      },
      'about': {
        component: Bar
      },
      'login': {
        component: Login
      },
      'register': {
        component: Register
      }
    })

    /* Route Redirects */
    // router.redirect({
    //   '*': '/home'
    // })

    /* Bootstrap routes to the main component */
    router.start({
      components: { App }
    }, 'body')
