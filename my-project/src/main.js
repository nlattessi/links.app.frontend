import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

import App from './components/App'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Links from './components/Links'

import auth from './auth'

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

auth.checkAuth()

export const router = new VueRouter({
  hashbang: false,
  history: true,
  linkActiveClass: 'active-class'
})

router.map({
  'home': {
    component: Home
  },
  'login': {
    component: Login
  },
  'register': {
    component: Register
  },
  '/links': {
    component: Links
  }
})

router.redirect({
  '*': '/login'
})

router.start(App, '#app')
