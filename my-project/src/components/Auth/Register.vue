<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card card-block">
        <h3 class="card-title">Register for an account</h3>
        <form role="form" v-on:submit.prevent="register">

          <alert :alerts.sync="alerts"></alert>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="user@email.com" v-model="formUser.email" />
          </div>


          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="formUser.password" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="password_confirmation">Confirm Password</label>
                <input type="password" class="form-control" id="password_confirmation" placeholder="Password" v-model="formUser.password_confirmation" />
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="registering">Register</button>

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
          password: null,
          password_confirmation: null
        },
        alerts: [],
        registering: false
      }
    },

    methods: {
      register () {
        this.registering = true;
        this.$http.post(process.env.API_URL_REGISTER, this.formUser)
          .then((response) => {
            auth.login(response.body.token);
            this.$dispatch('userLoggedIn');
            this.$router.go('/links');
          }, (response) => {
            this.alerts = [];
            if (response.status === 422) {
              for (const key in response.body) {
                if (response.body.hasOwnProperty(key)) {
                  this.alerts.push({
                    type: 'danger',
                    message: response.body[key]
                  });
                }
              }
            }
            this.registering = false;
          })
      }
    }
  }
</script>