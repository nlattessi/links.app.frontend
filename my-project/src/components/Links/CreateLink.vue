<template>
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <div class="card card-block">
        <h3 class="card-title">New Link</h3>
        <form role="form" v-on:submit.prevent="create">

          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" v-model="newLink.title" :disabled="disabled" />
          </div>

          <div class="form-group">
            <label for="url">Url</label>
            <input type="text" class="form-control" id="url" v-model="newLink.url" :disabled="disabled" />
          </div>

          <div class="form-group">
            <label for="category">Category</label>
            <select class="form-control" v-model="newLink.category" :disabled="disabled">
              <option value="" selected disabled>Select category...</option>
              <template v-for="category in categories">
                <option value="{{category.id}}">{{category.name}}</option>
              </template>
            </select>
          </div>

          <button type="submit" class="btn btn-primary btn-block" :disabled="disabled">Add new link</button>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../../auth';
  import store from '../../store';

  import alertService from '../../alerts';

  export default {
    data () {
      return {
        newLink: {
          title: null,
          url: null,
          category: null
        },
        categories: "",
        disabled: false,
      }
    },

    methods: {
      getCategories() {
        this.$http.get(process.env.API_URL_CATEGORIES, { headers: auth.getAuthHeader() })
          .then((response) => {
            this.categories = response.body.data
            if (this.categories.length < 1) {
              this.disabled = true;
              // this.alerts.push({
              //   type: 'danger',
              //   message: 'Create a category before creating a new link.'
              // });
              alertService.addAlert('danger', 'Create a category before creating a new link.');
            }
          }, (response) => {
            // this.alerts.push({
            //   type: 'danger',
            //   message: response.body.error.status + ': ' + response.body.error.message
            // });
            alertService.addAlert('danger', response.body.error.status + ': ' + response.body.error.message);
          });
      },

      create () {
        if (this.newLink.category !== "") {
          this.disabled = true;
          this.$http.post(process.env.API_URL_LINKS, this.newLink, { headers: auth.getAuthHeader() })
            .then((response) => {
              this.$dispatch('addedLink', response.body);
              alertService.addAlert('success', 'Link added!');
              this.newLink.title = null;
              this.newLink.url = null;
              this.newLink.category = "";
              this.disabled = false;
              // this.$router.go('/links');
            }, (response) => {
              if (response.status === 400 || response.status === 422) {
                if (response.status === 422) {
                  for (const key in response.body) {
                    if (response.body.hasOwnProperty(key)) {
                      // this.alerts.push({
                      //   type: 'danger',
                      //   message: response.body[key]
                      // });
                      alertService.addAlert('danger', response.body[key]);
                    }
                  }
                } else {
                  // this.alerts.push({
                  //   type: 'danger',
                  //   message: 'Sorry, an error has been occurred.'
                  // });
                  alertService.addAlert('danger', 'Sorry, an error has been occurred.');
                }
              }
              this.disabled = false;
            });

        } else {
          // this.alerts.push({
          //   type: 'danger',
          //   message: 'A category must be selected.'
          // });
          alertService.addAlert('danger', 'A category must be selected.');
        }
      }
    },

    ready () {
      this.getCategories();
    }
  }
</script>