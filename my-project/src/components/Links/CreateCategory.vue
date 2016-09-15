<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card card-block">
        <h3 class="card-title">New Category</h3>
        <form role="form" v-on:submit.prevent="create">

          <alert :alerts.sync="alerts"></alert>

          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="newCategory.name" />
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="adding">Add new category</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../../auth';
  import Alert from '../Alert.vue';

  export default {
    components: { Alert },

    data () {
      return {
        newCategory: {
          name: null
        },
        alerts: [],
        adding: false
      }
    },

    methods: {
      create () {
        this.adding = true;
        this.$http.post(process.env.API_URL_CATEGORIES, this.newCategory, { headers: auth.getAuthHeader() })
          .then((response) => {
            this.$dispatch('addedCategory', response.body);
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
    }
  }
</script>