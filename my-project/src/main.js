import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './components/App.vue';
import Login from './components/Auth/Login.vue';
import Register from './components/Auth/Register.vue';
import Logout from './components/Auth/Logout.vue';
import Links from './components/Links/Links.vue';
import CreateCategory from './components/Links/CreateCategory.vue';
import CreateLink from './components/Links/CreateLink.vue';
import EditCategory from './components/Links/EditCategory.vue';
import EditLink from './components/Links/EditLink.vue';
import auth from './auth';
import alertService from './alerts';
import './assets/base.css';

Vue.use(VueResource);
Vue.use(VueRouter);

Vue.http.options.xhr = { withCredentials: true };

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.status === 401 && auth.isLogged()) {

      console.log('Error 401');
      console.log('Error status :: ', response.body.error.status);
      console.log('Error message :: ', response.body.error.message);

      auth.logout();
      router.go('/login');
    }
  });
});

auth.checkAuth();

export const router = new VueRouter({
  linkActiveClass: 'active'
});

router.map({
  '/login': {
    component: Login
  },
  '/register': {
    component: Register
  },
  '/logout': {
    component: Logout
  },
  '/links': {
    component: Links,
    loggedInOnly: true
  },
  '/create/category': {
    component: CreateCategory,
    loggedInOnly: true
  },
  '/create/link': {
    component: CreateLink,
    loggedInOnly: true
  },
  '/edit/category/:category': {
    name: 'editCategory',
    component: EditCategory,
    loggedInOnly: true
  },
  '/edit/link/:link': {
    name: 'editLink',
    component: EditLink,
    loggedInOnly: true
  },
});

router.redirect({
  '*': '/login'
});

router.beforeEach(function (transition) {
  alertService.cleanAlerts();

  if (transition.to.loggedInOnly && !auth.isLogged()) {
    transition.redirect('/login');
  } else {
    transition.next();
  }
});

router.start(App, '#app');
