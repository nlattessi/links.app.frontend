<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card card-block">
        <h3 class="card-title text-md-center">Log In</h3>

        <hr>

        <alert :alerts.sync="alerts"></alert>

        <button type="button" class="btn btn-primary btn-lg btn-block" @click="logInWithFacebook()" :disabled="loggingIn">Using Facebook Account</button>
        <!-- <button type="button" class="btn btn-danger btn-lg btn-block" @click="logInWithGoogle()" :disabled="loggingIn">Using Google Account</button> -->

        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->

        <div id="gSignInWrapper">
          <span class="label">Sign in with:</span>
          <div id="customBtn" class="customGPlusSignIn">
            <span class="icon"></span>
            <span class="buttonText">Google</span>
          </div>
        </div>
        <div id="name"></div>

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

      <div class="card-footer text-muted">
        <p class="card-title text-md-right">Don't have an account? <button type="submit" class="btn btn-outline-secondary btn-sm" v-link="'/register'">Sign up</button></p>
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
        loggingIn: false,


        googleUser: {},


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
        this.loggingIn = true;
        const self = this;
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

        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
          console.log('OK');
          // console.log('token :: ', token);
          // console.log(user);

          firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function(idToken) {
            // Send token to your backend via HTTPS
            // ...
            console.log(idToken);

            self.loggingIn = false;
          }).catch(function(error) {
            // Handle error
            self.loggingIn = false;
          });



        }).catch((error) => {
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

          self.loggingIn = false;
        });
      },

      logInWithGoogle () {
        var self = this;
        self.loggingIn = false;
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          console.log('OK');
          console.log(user);
          
          self.loggingIn = false;
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

          self.loggingIn = false;
        });

      },

      // onSignIn (googleUser) {
      //   var profile = googleUser.getBasicProfile();
      //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      //   console.log('Name: ' + profile.getName());
      //   console.log('Image URL: ' + profile.getImageUrl());
      //   console.log('Email: ' + profile.getEmail());
      // }

      startApp () {
        gapi.load('auth2', function(){
          // Retrieve the singleton for the GoogleAuth library and set up the client.
          auth2 = gapi.auth2.init({
            client_id: '367309930083-53pu80b66ua3jro4fdu0tv8cvsqceqhs.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
          });
          attachSignin(document.getElementById('customBtn'));
        });
      },

      attachSignin (element) {
        console.log(element.id);
        auth2.attachClickHandler(element, {},
            function(googleUser) {
              document.getElementById('name').innerText = "Signed in: " +
                  googleUser.getBasicProfile().getName();
            }, function(error) {
              alert(JSON.stringify(error, undefined, 2));
            });
      }
    },

    ready () {
      console.log(gapi);
      this.startApp();
    }
  }
</script>

<style>
  #customBtn {
    display: inline-block;
    background: white;
    color: #444;
    width: 190px;
    border-radius: 5px;
    border: thin solid #888;
    box-shadow: 1px 1px 1px grey;
    white-space: nowrap;
  }
  
  #customBtn:hover {
    cursor: pointer;
  }
  
  span.label {
    font-family: serif;
    font-weight: normal;
  }
  
  span.icon {
    background: url('/g-normal.png') transparent 5px 50% no-repeat;
    display: inline-block;
    vertical-align: middle;
    width: 42px;
    height: 42px;
  }
  
  span.buttonText {
    display: inline-block;
    vertical-align: middle;
    padding-left: 42px;
    padding-right: 42px;
    font-size: 14px;
    font-weight: bold;
    /* Use the Roboto font that is loaded in the <head> */
    font-family: 'Roboto', sans-serif;
  }
</style>