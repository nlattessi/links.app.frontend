import {router} from '../main';
import * as jws from 'jws';
import Vue from 'vue';

import googleAuth from '../google-auth';

export default {
  user: {
    authenticated: false
  },
  authenticated: false,
  token: null,
  origin: null,

  /*login(context, creds, redirect) {

    context.$http.post(process.env.API_URL_LOGIN, creds)
      .then((response) => {
        // console.log(response.body)
        localStorage.setItem('id_token', response.body.token)
        this.user.authenticated = true
        if (redirect) router.go(redirect)
      }, (response) => {
        // console.log(response)
        context.error = response.body.error
      })
  },*/

  /*register(context, creds, redirect) {
    context.$http.post(process.env.API_URL_REGISTER, creds)
      .then((response) => {
        console.log(response)
        localStorage.setItem('id_token', response.body.token)
        this.user.authenticated = true      // console.log(decoded)
        if (redirect) router.go(redirect)
      }, (response) => {
        // console.log(response)
        context.error = response.body.error
      })
  },*/

  /*logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },*/

  login(token, origin) {
    this.token = token;
    this.authenticated = true;
    this.user.authenticated = true;
    this.origin = origin;
    localStorage.setItem('linksapp-jwt', this.token);
  },

  logout() {
    if (this.origin === 'google') {
      googleAuth.client.disconnect();
    } else if (this.origin === 'facebook') {
      FB.logout();
    }

    this.token = null;
    this.authenticated = false;
    this.user.authenticated = false;
    this.origin = null;
    localStorage.removeItem('linksapp-jwt');
  },

  checkAuth() {
    console.log(this.authenticated);

    const jwt = localStorage.getItem('linksapp-jwt');

    if (jwt) {
      const decoded = jws.decode(jwt);

      if (decoded) {
        if (Math.floor(Date.now() / 1000) < decoded.payload.exp) {

          console.log(this.authenticated);

          this.authenticated = true;

          console.log(this.authenticated);

          return;
        }
        console.log(this.authenticated);
        console.log('jwt expired :: ', new Date(decoded.payload.exp * 1000));
      }
    }

console.log(this.authenticated);
    this.authenticated = false;
    return;
  },

  isLogged() {
    return this.authenticated;
  },

  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('linksapp-jwt')
    };
  },

  init() {
    googleAuth.init();
  }

}
