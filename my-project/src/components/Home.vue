<template>

  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h1 class="heading">Links</h1>

      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>

      <template v-for="category in categories">
        <h2>{{ category.name }}</h2>

        <modal :show.sync="showModal"></modal>
        <button id="show-modal" @click="showModal = true">New Post</button>

        <ul>
          <li v-for="link in category.links.data">
            <a href="{{ link.url }}">{{ link.title ? link.title : link.url }}</a>
          </li>
        </ul>
      </template>

    </div>
  </div>
</template>

<script>
import auth from '../auth'

import Modal from './Modal'

export default {
  components: {
    Modal
  },

  data() {
    return {
      categories: [],
      error: '',
      showModal: false
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
</script>

<style>
  .heading {
    border-bottom: .05rem solid #e5e5e5;
  }
</style>