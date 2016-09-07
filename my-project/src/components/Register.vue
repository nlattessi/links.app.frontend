<template>
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4">
      <h2>Register</h2>
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
      },
      error: ''
    }
  },

  methods: {

    submit() {

      const credentials = {
        email: this.credentials.email,
        password: this.credentials.password,
        password_confirmation: this.credentials.password_confirmation
      }

      auth.register(this, credentials, '/home')
    }

  }
}
</script>
