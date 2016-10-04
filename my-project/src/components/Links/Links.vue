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
        <div class="col-md-8 offset-md-2">
            <div class="card card-block">
                <h3 class="card-title text-md-center">Links</h3>

                <hr>

                <alert :alerts.sync="alerts"></alert>

                <div class="text-md-center">
                    <p class="content">Placeholder</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
  import auth from '../../auth'
  import store from '../../store';

  import Alert from '../Alert.vue';

  export default {
    components: { Alert },

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