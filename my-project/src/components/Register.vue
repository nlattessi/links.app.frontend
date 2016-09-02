<template>
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
</template>

<script>
export default {
  data () {
    return {
      msg: 'Register',
      email: '',
      password: '',
      password_confirmation: ''
    }
  },

  methods: {

    register: function (event) {

      console.log('register')
      console.log(this.email)
      console.log(this.password)
      console.log(this.password_confirmation)

      this.$http.post(
        'https://dry-shore-86449.herokuapp.com/auth/register',
        {email: this.email, password: this.password, password_confirmation: this.password_confirmation},
        ).then((response) => {

        console.log('success')
        console.log(response.json())

      }, (response) => {

        console.log('error')
        console.log(response.json())

      })

    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    color: #42b983;
  }
</style>