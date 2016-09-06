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

    <button v-on:click="login">Login!</button>


  </div>
</template>-->
<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input type="email" class="form-control" placeholder="Enter your email" v-model="credentials.email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
    </div>
    <button class="btn btn-primary" @click="submit()">Access</button>
  </div>
</template>

<script>
// import * as localForage from 'localforage'
import auth from '../auth'

export default {
  data () {
    return {
      // msg: 'Login',
      // email: '',
      // password: '',
      credentials: {
          email: '',
          password: ''
        },
        error: ''
    }
  },

  methods: {

    submit() {

      const credentials = {
        email: this.credentials.email,
        password: this.credentials.password
      }

      auth.login(this, credentials, 'links')

    }

    // login: function (event) {

    //   // console.log('localforage is: ', localForage)

    //   // console.log('login')
    //   // console.log(this.email)
    //   // console.log(this.password)

    //   this.$http.post(
    //     'https://dry-shore-86449.herokuapp.com/auth/login',
    //     {email: this.email, password: this.password},
    //     ).then((response) => {

    //     // console.log('success')
    //     // console.log(response.json())

    //     localForage.setItem('accessToken', response.json().token).then((value) => {
    //         // Do other things once the value has been saved.
    //         // console.log(value)

    //         this.isLogged = true

    //         this.$router.go({
    //           path: '/home'
    //         })
    //     }).catch((err) => {
    //         // This code runs if there were any errors
    //         console.log(err)
    //     })

    //     // console.log(this.$router)
    //     // this.$router.go({
    //     //   path: '/home'
    //     // })

    //   }, (response) => {

    //     console.log('error')
    //     console.log(response.json())

    //   })

    // }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: #42b983;
  }
</style>