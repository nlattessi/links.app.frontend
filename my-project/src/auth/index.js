import {router} from '../main'
// import * as localForage from 'localforage'<

const API_URL = 'https://dry-shore-86449.herokuapp.com/'
const LOGIN_URL = API_URL + 'auth/login'
const REGISTER_URL = API_URL + 'auth/register'

export default {

  user: {
    authenticated: false
  },

  login(context, creds, redirect) {

    context.$http.post(LOGIN_URL, creds).then((response) => {
      localStorage.setItem('id_token', response.json().token)
      this.user.authenticated = true
      if (redirect) router.go(redirect)
    }, (response) => {
      context.error = response.json().error
    })
  },

  register(context, creds, redirect) {

    context.$http.post(REGISTER_URL, creds).then((response) => {
      localStorage.setItem('id_token', response.json().token)
      this.user.authenticated = true
      if (redirect) router.go(redirect)
    }, (response) => {
      context.error = response.json().error
    })
  },

  logout() {

    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth() {

    const jwt = localStorage.getItem('id_token')
    this.user.authenticated = (jwt) ? true : false;
  },

  getAuthHeader() {

    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }

}
