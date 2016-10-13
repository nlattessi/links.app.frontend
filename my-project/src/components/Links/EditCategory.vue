<template>
	<div class="row">
		<div class="col-md-8 offset-md-2">
			<div class="card card-block">
				<h3 class="card-title">Update Category</h3>
				<form role="form" v-on:submit.prevent="update">

					<div class="form-group">
						<label for="name">Name</label>
						<input type="text" class="form-control" id="name" v-model="editCategory.name" :disabled="editing" />
					</div>

					<button type="submit" class="btn btn-primary btn-block" :disabled="editing">Save category</button>

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
        editCategory: {
          id: null,
          name: null
        },
        editing: false
      }
    },

    methods: {
      prepareForm() {
        this.editing = true;
        this.$http.get(process.env.API_URL_CATEGORIES, { headers: auth.getAuthHeader() })
          .then((response) => {
            const category = this.findCategory(response.body.data, this.editCategory.id);
            if (category !== undefined) {
              this.editCategory.name = category.name;
              this.editing = false;
            } else {
              alertService.addAlert('danger', 'The category id not match with an existent category.');
            }
          }, (response) => alertService.addAlert('danger', response.body.error.status + ': ' + response.body.error.message));
      },

      update() {
        this.editing = true;
        this.$http.patch(`${process.env.API_URL_CATEGORIES}/${this.editCategory.id}`, this.editCategory, { headers: auth.getAuthHeader() })
          .then((response) => {
            // this.$dispatch('editedCategory', response.body);
            alertService.addAlert('success', 'Category updated!', true);
            this.$router.go('/links');
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
            this.editing = false;
          });
      },

      findCategory(categories, id) {
        return categories.find((category) => {
          return category.id === id;
        });
      }
    },

    ready() {
      this.editCategory.id = this.$route.params.category;
      this.prepareForm();
    }
  }
</script>