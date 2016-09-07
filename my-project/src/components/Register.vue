<!--<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <span>Email</span>
    <br>
    <input type="text" v-model="email" placeholder="user@email.com">

    <br><br>

    <span>Password</span>
    <br>
    <input type="password" v-model="password">

    <br><br>

    <span>Confirm password</span>
    <br>
    <input type="password" v-model="password_confirmation">

    <br><br>

    <button v-on:click="register">Register!</button>

  </div>
</template>-->
<template>
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Register</h2>
      <p>Register for the first time.</p>
      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <div class="form-group">
        <input type="email" class="form-control" placeholder="Enter your email" v-model="credentials.email">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Confirm your password" v-model="credentials.password_confirmation">
      </div>
      <button class="btn btn-primary" @click="submit()">Register</button>
    </div>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data () {
    return {
      credentials: {
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  methods: {

    submit() {

      const credentials = {
        email: this.credentials.email,
        password: this.credentials.password,
        password_confirmation: this.credentials.password_confirmation
      }

      auth.register(this, credentials, 'home')

    },

    // register: function (event) {

    //   console.log('register')
    //   console.log(this.email)
    //   console.log(this.password)
    //   console.log(this.password_confirmation)

    //   this.$http.post(
    //     'https://dry-shore-86449.herokuapp.com/auth/register',
    //     {email: this.email, password: this.password, password_confirmation: this.password_confirmation},
    //     ).then((response) => {

    //     console.log('success')
    //     console.log(response.json())

    //   }, (response) => {

    //     console.log('error')
    //     console.log(response.json())

    //   })

    // }

  }
}
</script>
