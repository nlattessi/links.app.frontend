import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './components/App'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

import auth from './auth'

import './assets/base.css'

Vue.use(VueResource)
Vue.use(VueRouter)

// Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
// Attach the token on every request
Vue.http.interceptors.push((request, next) => {
  const token = localStorage.getItem('id_token')
  console.log(token)

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`)
  }

  next()
})

// Attempts to refresh the token
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.status === 401) {
      if (response.body.error.message === 'Token has expired') {
        return auth.refresh()
          .then((response) => {
            const token = response.headers.get('Authorization').split(" ")[1]
            localStorage.setItem('id_token', token)
            request.headers.set('Authorization', `Bearer ${token}`)
            return Vue.http(request)
          }, (response) => {
            console.log('error')
            console.log(response)
          })
      }

      if (response.body.error.message === 'The token has been blacklisted') {
        auth.logout()
        return router.go('/')
      }
    }
  })
})

auth.checkAuth()

export const router = new VueRouter({
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
})

router.redirect({
  '*': '/'
})

router.start(App, '#app')
