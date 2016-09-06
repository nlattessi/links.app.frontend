// import '../styles.css'

import Vue from 'vue'
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// import App from './App'

import Header from './components/Header.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Auth from './components/Auth.vue'
import Home from './components/Home.vue'

import App from './components/App.vue';

Vue.use(VueRouter)
Vue.use(VueResource)

const App = Vue.extend({
  data() {
    return {
      isLogged: false
    }
  },
  http: {
    headers: {
      Accept: 'application/json'
    }
  }
})

const router = new VueRouter()

router.map({
  '*': {
    component: {
      template: '<h1>Not Found</h1>'
    }
  },
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

// router.start(App, '#app')
router.start({
  components: { App }
}, 'body')
