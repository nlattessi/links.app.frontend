<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card card-block">
        <h3 class="card-title">New Category</h3>
        <form role="form" v-on:submit.prevent="create">

          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" v-model="newCategory.name" :disabled="adding" tabindex="1" />
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="adding" tabindex="2">Add new category</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import alertService from '../../alerts';
  import auth from '../../auth';

  export default {
    data () {
      return {
        newCategory: {
          name: null
        },
        adding: false
      }
    },

    methods: {
      create () {
        this.adding = true;
        this.$http.post(process.env.API_URL_CATEGORIES, this.newCategory, { headers: auth.getAuthHeader() })
          .then((response) => {
            // this.$dispatch('addedCategory', response.body);
            alertService.addAlert('success', 'Category added!');
            this.newCategory.name = null;
            this.adding = false;
            // this.$router.go('/links');
          }, (response) => {
            if (response.status === 400 || response.status === 422) {
              if (response.status === 422) {
                for (const key in response.body) {
                  if (response.body.hasOwnProperty(key)) {
                    alertService.addAlert('danger', response.body[key]);
                  }
                }
              } else {
                alertService.addAlert('danger', 'Sorry, an error has been occurred.');
              }
            }
            this.adding = false;
          });
      }
    }
  }
</script>