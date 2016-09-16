<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card card-block">
        <h3 class="card-title text-md-center">Log In</h3>

        <hr>

        <alert :alerts.sync="alerts"></alert>

        <button type="button" class="btn btn-primary btn-lg btn-block">Using Facebook Account</button>
        <button type="button" class="btn btn-danger btn-lg btn-block">Using Google Account</button>
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
      }
    }
  }
</script>