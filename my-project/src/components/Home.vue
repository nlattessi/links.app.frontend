<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>

    <ul id="example-1">
      <li v-for="category in categories">
        <h1>{{ category.name }}</h1>
        <ul>
          <li v-for="link in category.links.data">
            <a href="{{ link.url }}">{{ link.url }}</a>
          </li>
        </ul>
      </li>
    </ul>

  </div>
</template>

<script>
import auth from '../auth'

export default {
  data() {
    return {
      categories: [],
      error: ''
    }
  },

  ready() {

      this.$http.get('https://dry-shore-86449.herokuapp.com/user/categories?include=links', { headers: auth.getAuthHeader() })
        .then((response) => {
          this.categories = response.json().data
          console.log(response.json())
        }, (response) => {
          console.log(response.json())
          this.error = '' + response.json().error.status + ': ' + response.json().error.message
        })

  },

  route: {
    canActivate() {
      return auth.user.authenticated
    } 
  }
}