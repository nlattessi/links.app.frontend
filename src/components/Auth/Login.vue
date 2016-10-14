<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card card-block">
        <h3 class="card-title text-md-center">Welcome!</h3>

        <hr>

        <div v-if="loggingIn" transition="fade">
          <loader message="Logging in..."></loader>
        </div>

        <div v-else>

          <!--<button type="button" class="btn btn-primary btn-lg btn-block" @click="logInWithFacebook()" :disabled="loggingIn">Using Facebook Account</button>
          <button type="button" class="btn btn-danger btn-lg btn-block" @click="logInWithGoogle()" :disabled="loggingIn">Using Google Account</button>

          <hr>
          <p class="text-md-center">Or</p>
          <hr>-->

          <form role="form" v-on:submit.prevent="login">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" class="form-control" id="email" v-model="formUser.email" />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="formUser.password" />
            </div>

            <button type="submit" class="btn btn-info pull-md-right" :disabled="loggingIn">Login</button>
          </form>

        </div>
      </div>

      <div class="card-footer text-muted">
        <p class="card-title text-md-right">Don't have an account? <button type="submit" class="btn btn-outline-secondary btn-sm" v-link="'/register'">Sign up</button></p>
      </div>

    </div>
  </div>
</template>

<script>
  import alertService from '../../alerts';
  import auth from '../../auth';

  import Loader from '../Loader.vue';

  export default {
    components: {
      Loader
    },

    data () {
      return {
        formUser: {
          email: null,
          password: null
        },
        loggingIn: false,
      }
    },

    methods: {
      login () {
        this.loggingIn = true;
        this.$http.post(process.env.API_URL_LOGIN, this.formUser)
          .then((response) => {
            auth.login(response.body.token, 'local');
            this.$dispatch('userLoggedIn');
            this.$router.go('/links');
          }, (response) => {
            if (response.status === 404 || response.status === 422) {
              if (response.status === 422) {
                for (const key in response.body) {
                  if (response.body.hasOwnProperty(key)) {
                    alertService.addAlert('danger', response.body[key]);
                  }
                }
              } else {
                alertService.addAlert('danger', 'Sorry, this credentials are invalid.');
              }
            }
            this.loggingIn = false;
          })
      },

      /*logInWithFacebook () {
        this.loggingIn = true;
        FB.login((response) => {
          if (response.authResponse) {
            this.$http.get(`${process.env.API_URL_FACEBOOK_LOGIN}?accessToken=${response.authResponse.accessToken}`)
              .then((response) => {
                auth.login(response.body.token, 'facebook');
                this.$dispatch('userLoggedIn');
                this.$router.go('/links');
            }, (response) => {
              this.alerts = [];
              if (response.status === 404 || response.status === 422) {
                if (response.status === 422) {
                  for (const key in response.body) {
                    if (response.body.hasOwnProperty(key)) {
                      alertService.addAlert('danger', response.body[key]);
                    }
                  }
                } else {
                  alertService.addAlert('danger', 'Sorry, this credentials are invalid.');
                }
              }
              this.loggingIn = false;
            });
          } else {
            alertService.addAlert('danger', 'User cancelled login or did not fully authorize.');
          }
        });
      },*/

      /*logInWithGoogle () {
        this.loggingIn = true;
        googleauth.client.signIn()
          .then((response) => {
            this.$http.get(`${process.env.API_URL_GOOGLE_LOGIN}?accessToken=${response.getAuthResponse().id_token}`)
                .then((response) => {
                  auth.login(response.body.token, 'google');
                  this.$dispatch('userLoggedIn');
                  this.$router.go('/links');
                }, (response) => {
                  this.alerts = [];
                  if (response.status === 404 || response.status === 422) {
                    if (response.status === 422) {
                      for (const key in response.body) {
                        if (response.body.hasOwnProperty(key)) {
                          alertService.addAlert('danger', response.body[key]);
                        }
                      }
                    } else {
                      alertService.addAlert('danger', 'Sorry, this credentials are invalid.');
                    }
                  }
                  this.loggingIn = false;
                });
            // this.loggingIn = false;
          });

      },*/
    },
    
    route: {
      activate: function (transition) {
        if (auth.isLogged()) {
          transition.redirect('/links');
        } else {
          transition.next();
        }
      },
    },
  }
</script>
