import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './components/App.vue';
import Login from './components/Auth/Login.vue';
import Register from './components/Auth/Register.vue';
import Home from './components/Home.vue';
import CreateCategory from './components/Links/CreateCategory.vue';
import CreateLink from './components/Links/CreateLink.vue';

import auth from './auth';

import './assets/base.css';

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.xhr = {withCredentials: true};

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.status === 401 && auth.isLogged()) {

      console.log('Error 401');
      console.log('Error status :: ', response.body.error.status);
      console.log('Error message :: ', response.body.error.message);

      auth.logout();
      Vue.router.go('/');
    }
  });
});

auth.checkAuth();

export const router = new VueRouter({
  linkActiveClass: 'active',
  hashbang: false,
  history: true,
  mode: 'html5'
});

router.map({
  // '/': {
  //   // component: {
  //   //   template: '<h1>Please login or register</h1>'
  //   // }
  //   component: Login
  // },
  '/login': {
    component: Login
  },
  '/register': {
    component: Register
  },
  '/links/': {
    // component: Links
    component: Home
  },
  '/links/create/category': {
    component: CreateCategory
  },
  '/links/create/link': {
    component: CreateLink
  },
});

router.redirect({
  '*': '/login'
});

router.start(App, '#app');
