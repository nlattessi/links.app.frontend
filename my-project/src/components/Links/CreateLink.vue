<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card card-block">
        <h3 class="card-title">New Link</h3>
        <form role="form" v-on:submit.prevent="create">

          <alert :alerts.sync="alerts"></alert>

          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="newLink.title" />
          </div>

          <div class="form-group">
            <label for="url">Url</label>
            <input type="text" class="form-control" id="url" v-model="newLink.url" />
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="adding">Add new link</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../../auth';
  import store from '../../store';
  import Alert from '../Alert.vue';

  export default {
    components: { Alert },

    data () {
      return {
        newLink: {
          title: null,
          url: null
        },
        categories: null,
        alerts: [],
        adding: false
      }
    },

    methods: {
      create () {
        this.adding = true;
        this.$http.post(process.env.API_URL_LINKS, this.newLink, { headers: auth.getAuthHeader() })
          .then((response) => {
            this.$dispatch('addedLink', response.body);
            this.$router.go('/links');
          }, (response) => {
            this.alerts = [];
            if (response.status === 400 || response.status === 422) {
              if (response.status === 422) {
                for (const key in response.body) {
                  if (response.body.hasOwnProperty(key)) {
                    this.alerts.push({
                      type: 'danger',
                      message: response.body[key]
                    });
                  }
                }
              } else {
                this.alerts.push({
                  type: 'danger',
                  message: 'Sorry, an error has been occurred.'
                });
              }
            }
            this.adding = false;
          });
      }
    },

    ready () {
      // this.categories = store.getCategories();
      this.categories = store.state.categories;
    }
  }
</script>