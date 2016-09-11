<template>

  <div class="row">
    <div class="col-md-10 offset-md-4">

      <div class="alert alert-danger" v-if="error">
        <p>{{ error }}</p>
      </div>

      <template v-for="category in categories">
        <h2>{{ category.name }}</h2>

        <ul>
          <li v-for="link in category.links.data">
            <a href="{{ link.url }}">{{ link.title ? link.title : link.url }}</a>
          </li>
        </ul>
      </template>

    </div>
  </div>

  <new-category-modal :show.sync="showNewCategoryModal"></new-category-modal>
  <new-link-modal :show.sync="showNewLinkModal"></new-category-modal>
</template>

<script>
  import auth from '../auth'
  import NewCategoryModal from './NewCategoryModal'
  import NewLinkModal from './NewLinkModal'

  export default {

    components: {
      NewCategoryModal,
      NewLinkModal
    },

    props: ['showNewCategoryModal', 'showNewLinkModal'],

    data() {
      return {
        categories: [],
        error: ''
      }
    },

    methods: {
      getCategories() {
        console.log('getCategories')
        // this.$http.get('https://dry-shore-86449.herokuapp.com/user/categories?include=links', { headers: auth.getAuthHeader() })
        //   .then((response) => {
        //     this.categories = response.json().data
        //   }, (response) => {
        //     this.error = '' + response.json().error.status + ': ' + response.json().error.message
        //   })
      }
    },

    ready() {
        this.getCategories()
    },

    route: {
      canActivate() {
        return auth.user.authenticated
      }
    },

    events: {
      'addedCategory': 'getCategories'
    }
  }
</script>
