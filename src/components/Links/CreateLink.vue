<template>
	<div class="row">
		<div class="col-md-8 offset-md-2">
			<div class="card card-block">
				<h3 class="card-title">New Link</h3>
				<form role="form" v-on:submit.prevent="create">

					<div class="form-group">
						<label for="title">Title</label>
						<input type="text" class="form-control" id="title" v-model="newLink.title" :disabled="adding" tabindex="1" />
					</div>

					<div class="form-group">
						<label for="url">Url</label>
						<input type="text" class="form-control" id="url" v-model="newLink.url" :disabled="adding" tabindex="2" />
					</div>

					<div class="form-group">
						<label for="category">Category</label>
						<select class="form-control" v-model="newLink.category" :disabled="adding" tabindex="3">
              <option value="" selected disabled>Select category...</option>
              <template v-for="category in categories">
                <option value="{{category.id}}">{{category.name}}</option>
              </template>
            </select>
					</div>

					<button type="submit" class="btn btn-primary btn-block" :disabled="adding" tabindex="4">Add new link</button>

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
        newLink: {
          title: null,
          url: null,
          category: null
        },
        categories: "",
        adding: false,
      }
    },

    methods: {
      getCategories() {
        this.$http.get(process.env.API_URL_CATEGORIES, { headers: auth.getAuthHeader() })
          .then((response) => {
            this.categories = response.body.data
            if (this.categories.length < 1) {
              this.adding = true;
              alertService.addAlert('danger', 'Create a category before creating a new link.', false, 0);
            }
          }, (response) => alertService.addAlert('danger', response.body.error.status + ': ' + response.body.error.message));
      },

      create () {
        if (this.newLink.category !== "") {
          this.adding = true;
          this.$http.post(process.env.API_URL_LINKS, this.newLink, { headers: auth.getAuthHeader() })
            .then((response) => {
              //this.$dispatch('addedLink', response.body);
              alertService.addAlert('success', 'Link added!');
              this.newLink.title = null;
              this.newLink.url = null;
              this.newLink.category = "";
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

        } else {
          alertService.addAlert('danger', 'A category must be selected.');
        }
      }
    },

    ready () {
      this.getCategories();
    }
  }
</script>