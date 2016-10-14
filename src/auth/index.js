import * as jws from 'jws';
import Vue from 'vue';

export default {
  user: {
    authenticated: false
  },
  token: null,
  origin: null,

  login(token, origin) {
    this.token = token;
    this.user.authenticated = true;
    this.origin = origin;
    localStorage.setItem('linksapp-jwt', this.token);
  },

  logout() {
    /*if (this.origin === 'google') {
      googleAuth.client.disconnect();
    } else if (this.origin === 'facebook') {
      FB.logout();
    }*/

    this.token = null;
    this.user.authenticated = false;
    this.origin = null;
    localStorage.removeItem('linksapp-jwt');
  },

  checkAuth() {
    const jwt = localStorage.getItem('linksapp-jwt');

    if (jwt) {
      const decoded = jws.decode(jwt);

      if (decoded) {
        if (Math.floor(Date.now() / 1000) < decoded.payload.exp) {
          this.user.authenticated = true;
          return;
        }
        console.log('jwt expired :: ', new Date(decoded.payload.exp * 1000));
      }
    }

    this.user.authenticated = false;

    return;
  },

  isLogged() {
    return this.user.authenticated;
  },

  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('linksapp-jwt')
    };
  }
}
