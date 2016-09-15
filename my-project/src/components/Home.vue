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

  <!--<new-category-modal :show.sync="showNewCategoryModal"></new-category-modal>-->
  <!--<new-link-modal :show.sync="showNewLinkModal"></new-category-modal>-->
</template>

<script>
  import auth from '../auth'
  // import NewCategoryModal from './NewCategoryModal'
  // import NewLinkModal from './NewLinkModal'

  import store from '../store';

  export default {

    // components: {
    //   NewCategoryModal,
    //   NewLinkModal
    // },

    // props: ['showNewCategoryModal', 'showNewLinkModal'],

    data() {
      return {
        categories: [],
        error: '',
        sharedState: store.state
      }
    },

    methods: {
      getCategories() {
        // console.log('getCategories')
        this.$http.get(process.env.API_URL_CATEGORIES, { headers: auth.getAuthHeader() })
          .then((response) => {
            this.categories = response.body.data
          }, (response) => {
            this.error = '' + response.body.error.status + ': ' + response.body.error.message
          })
      }
    },

    ready() {
        this.getCategories();

        store.getCategories();
        console.log(this.sharedState);
    },

    route: {
      canActivate() {
        return auth.isLogged();
      }
    },

    // events: {
    //   'addedCategory': 'getCategories'
    // }
  }
</script>
