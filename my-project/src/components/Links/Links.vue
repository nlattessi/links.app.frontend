<!--<template>

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
</template>-->

<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card card-block" v-for="category in categories">
        <h3 class="card-title text-md-center">{{category.name}}</h3>
        <div class="text-md-center" v-if="category.links.data">
          <div class="list-group">
            <template v-for="link in category.links.data">
              <a href="{{ link.url }}" class="list-group-item list-group-item-action">{{ link.title ? link.title : link.url }}</a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../../auth'
  import store from '../../store';

  // import Alert from '../Alert.vue';

  export default {
    // components: { Alert },

    // props: [ 'alerts' ],

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
            console.log(response);
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