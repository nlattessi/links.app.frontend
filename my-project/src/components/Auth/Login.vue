<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card card-block">
        <h3 class="card-title text-md-center">Log In</h3>

        <hr>

        <alert :alerts.sync="alerts"></alert>

        <button type="button" class="btn btn-primary btn-lg btn-block" @click="logInWithFacebook()" :disabled="loggingIn">Using Facebook Account</button>
        <button type="button" class="btn btn-danger btn-lg btn-block" @click="logInWithGoogle()" :disabled="loggingIn">Using Google Account</button>

        <!--<div class="g-signin2" data-onsuccess="onSignIn"></div>-->

        <hr>
        <p class="text-md-center">Or</p>
        <hr>

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
  </div>
</template>

<script>
  import auth from '../../auth';
  import Alert from '../Alert.vue';

  import firebase from '../../auth-firebase';

  export default {
    components: { Alert },

    data () {
      return {
        formUser: {
          email: null,
          password: null
        },
        alerts: [],
        loggingIn: false
      }
    },

    methods: {
      login () {
        this.loggingIn = true;
        this.$http.post(process.env.API_URL_LOGIN, this.formUser)
          .then((response) => {
            auth.login(response.body.token);
            this.$dispatch('userLoggedIn');
            this.$router.go('/links');
          }, (response) => {
            this.alerts = [];
            if (response.status === 404 || response.status === 422) {
              if (response.status === 422) {
                for (const key in response.body) {
                  if (response.body.hasOwnProperty(key)) {
                    this.alerts.push({
                      type: 'danger',
                      message: response.body[key]
                    });
                  }
                }
              } else {
                this.alerts.push({
                  type: 'danger',
                  message: 'Sorry, this credentials are invalid.'
                });
              }
            }
            this.loggingIn = false;
          })
      },

      logInWithFacebook () {
        // this.loggingIn = true;
        // var self = this;
        // FB.login(function(response) {
        //   if (response.authResponse) {
        //     self.$http.get(`${process.env.API_URL_FACEBOOK_LOGIN}?accessToken=${response.authResponse.accessToken}`)
        //       .then((response) => {
        //         auth.login(response.body.token);
        //         self.$dispatch('userLoggedIn');
        //         self.$router.go('/links');
        //     }, (response) => {
        //       self.alerts = [];
        //       if (response.status === 404 || response.status === 422) {
        //         if (response.status === 422) {
        //           for (const key in response.body) {
        //             if (response.body.hasOwnProperty(key)) {
        //               self.alerts.push({
        //                 type: 'danger',
        //                 message: response.body[key]
        //               });
        //             }
        //           }
        //         } else {
        //           self.alerts.push({
        //             type: 'danger',
        //             message: 'Sorry, this credentials are invalid.'
        //           });
        //         }
        //       }
        //       self.loggingIn = false;
        //     });
        //   } else {
        //     alert('user cancelled login or did not fully authorize');
        //   }
        // });
        // return false;

        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log('OK');
          console.log(user);
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log('ERROR!');
          console.log(error);
        });
      },

      logInWithGoogle () {

        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log('OK');
          console.log(user);
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
          console.log('ERROR!');
          console.log(error);
        });

      }
    }
  }
</script>