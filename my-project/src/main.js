import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// import App from './App'

import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Auth from './components/Auth.vue';
import Home from './components/Home.vue';

// import * as localforage from 'localforage';
// console.log('localforage is: ', localforage)

Vue.use(VueRouter)
Vue.use(VueResource)

// The router needs a root component to render.
// For demo purposes, we will just use an empty one
// because we are using the HTML as the app template.
// !! Note that the App is not a Vue instance.
var App = Vue.extend({
  http: {
    headers: {
      Accept: 'application/json'
    }
  }
})

// Create a router instance.
// You can pass in additional options here, but let's
// keep it simple for now.
var router = new VueRouter()

// Define some routes.
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
router.map({
    '/': {
      component: Auth
    },
    '/login': {
      component: Login
    },
    '/register': {
      component: Register
    },
    '/home': {
      component: Home
    }
})

// Now we can start the app!
// The router will create an instance of App and mount to
// the element matching the selector #app.
router.start(App, '#app')
