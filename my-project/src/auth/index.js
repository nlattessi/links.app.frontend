import {router} from '../main'
// import * as localForage from 'localforage'<
import * as jws from 'jws'
import Vue from 'vue'

// const API_URL = 'https://dry-shore-86449.herokuapp.com/'
const API_URL = 'http://links.app/'
const LOGIN_URL = API_URL + 'auth/login'
const REGISTER_URL = API_URL + 'auth/register'
const REFRESH_URL = API_URL + 'auth/refresh'

export default {

  user: {
    authenticated: false
  },

  login(context, creds, redirect) {

    context.$http.post(LOGIN_URL, creds).then((response) => {
      // console.log(response.body)
      localStorage.setItem('id_token', response.body.token)
      this.user.authenticated = true
      if (redirect) router.go(redirect)
    }, (response) => {
      console.log(response)
      context.error = response.body.error
    })
  },

  register(context, creds, redirect) {

    context.$http.post(REGISTER_URL, creds).then((response) => {
      localStorage.setItem('id_token', response.body.token)
      this.user.authenticated = true
      if (redirect) router.go(redirect)
    }, (response) => {
      context.error = response.body.error
    })
  },

  refresh() {
    return Vue.http.get(`${API_URL}/auth/refresh`)
      .then((response) => {
        const token = response.headers.get('Authorization').split(" ")[1]
        localStorage.setItem('id_token', token)
      })
    // return Vue.http.post(LOGIN_URL, {email: 'user@email.com', password: 'password'})
  },

  refreshToken(context) {

    return context.$http.get(REFRESH_URL, { headers: this.getAuthHeader() })
    // .then((response) => {
    //   // console.log(response)
    //   // console.log(response.headers.get('Authorization').split(" ")[1])
    //   localStorage.setItem(
    //     'id_token',
    //     response.headers.get('Authorization').split(" ")[1]
    //   )
    //   callback()
    // }, (response) => {
    //   console.log('error')
    //   this.logout()
    // })
  },

  logout() {

    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth() {

    // const jwt = localStorage.getItem('id_token')

    // if (jwt) {
    //   const decoded = jws.decode(jwt)
    //   // console.log(decoded)

    //   if (decoded) {
    //     if (Math.floor(Date.now() / 1000) < decoded.payload.exp) {
    //       // console.log('jwt not expired', new Date(decoded.payload.exp * 1000))
    //       // console.log('now is', new Date(Date.now()))
          this.user.authenticated = true
    //       return true
    //     }
    //   }
    // }

    // this.user.authenticated = false
    // return false

    // this.user.authenticated = (jwt) ? true : false;
  },

  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }

}
