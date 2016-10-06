<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card card-block">
        <h3 class="card-title text-md-center">Register for an account</h3>

        <hr>

        <div class="text-md-center" v-if="registering" transition="fade">
          <img src="http://s14.postimg.org/boisrfbv1/battery.gif" class="img-rounded" alt="...">
          <p class="content">Logging in...</p>
        </div>
        <div v-else>

          <form role="form" v-on:submit.prevent="register">

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
                  <input type="password" class="form-control" id="password_confirmation" placeholder="Password" v-model="formUser.password_confirmation"
                  />
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-info pull-md-right" :disabled="registering">Register</button>

          </form>
        </div>
      </div>

      <div class="card-footer text-muted">
        <p class="card-title text-md-right">Already have an account? <button type="submit" class="btn btn-outline-secondary btn-sm" v-link="'/login'">Log in</button></p>
      </div>

    </div>
  </div>
</template>

<script>
  import auth from '../../auth';

  export default {
    props: [ 'alerts' ],

    data () {
      return {
        formUser: {
          email: null,
          password: null,
          password_confirmation: null
        },
        registering: false
      }
    },

    methods: {
      register () {
        this.registering = true;
        this.$http.post(process.env.API_URL_REGISTER, this.formUser)
          .then((response) => {
            auth.login(response.body.token);
            this.$dispatch('userRegistered');
            this.$router.go('/links');
          }, (response) => {
            // this.alerts = [];
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
