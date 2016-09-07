import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './components/App'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Links from './components/Links'
import Categories from './components/Categories'

import auth from './auth'

import './assets/base.css'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

auth.checkAuth()

export const router = new VueRouter({
  // hashbang: false,
  // history: true,
  linkActiveClass: 'active'
})

router.map({
  '/': {
    component: {
      template: '<h1>Please login or register to use the app!</h1>'
    }
  },
  '/home': {
    component: Home
  },
  '/login': {
    component: Login
  },
  '/register': {
    component: Register
  },
  // '/links': {
  //   component: Links
  // },
  // '/categories': {
  //   component: Categories
  // }
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
