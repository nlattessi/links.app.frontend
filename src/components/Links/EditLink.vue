<template>
	<div class="row">
		<div class="col-md-8 offset-md-2">
			<div class="card card-block">
				<h3 class="card-title">Edit Link</h3>
				<form role="form" v-on:submit.prevent="update">

					<div class="form-group">
						<label for="title">Title</label>
						<input type="text" class="form-control" id="title" v-model="editLink.title" :disabled="editing" tabindex="1" />
					</div>

					<div class="form-group">
						<label for="url">Url</label>
						<input type="text" class="form-control" id="url" v-model="editLink.url" :disabled="editing" tabindex="2" />
					</div>

					<div class="form-group">
						<label for="category">Category</label>
						<select class="form-control" v-model="editLink.category" :disabled="editing" tabindex="3">
              <option value="" selected disabled>Select category...</option>
              <template v-for="category in categories">
                <option value="{{category.id}}">{{category.name}}</option>
              </template>
            </select>
					</div>

					<button type="submit" class="btn btn-primary btn-block" :disabled="editing" tabindex="4">Save link</button>

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
        editLink: {
          id: null,
          title: null,
          url: null,
          category: null
        },
        categories: "",
        editing: false,
      }
    },

    methods: {
      prepareForm() {
        this.editing = true;
        this.$http.get(process.env.API_URL_CATEGORIES_WITH_LINKS, { headers: auth.getAuthHeader() })
          .then((response) => {
            this.categories = response.body.data
            const link = this.findLink(this.categories, this.editLink.id);
            if (link !== undefined) {
              this.editLink.title = link.title;
              this.editLink.url = link.url;
              this.editLink.category = link.category;
              this.editing = false;
            } else {
              alertService.addAlert('danger', 'The link id not match with an existent link.');
            }

            if (this.categories.length < 1) {
              this.editing = true;
              alertService.addAlert('danger', 'Create a category before creating a new link.', false, 0);
            }
          }, (response) => alertService.addAlert('danger', response.body.error.status + ': ' + response.body.error.message));
      },

      update() {
        if (this.editLink.category !== "") {
          this.editing = true;
          this.$http.patch(`${process.env.API_URL_LINKS}/${this.editLink.id}`, this.editLink, { headers: auth.getAuthHeader() })
            .then((response) => {
              //this.$dispatch('editedLink', response.body);
              alertService.addAlert('success', 'Link updated!', true);
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
        } else {
          alertService.addAlert('danger', 'A category must be selected.');
        }
      },

      findLink(categories, id) {
        let link = undefined;
        
        for (let [index, elem] of categories.entries()) {
          if (elem.links.data.length > 0) {
            link = elem.links.data.find((item) => {
              return item.id === id;
            });

            if (link !== undefined) {
              link.category = elem.id;
              return link;
            }
          }
        }

        return link;
      },
    },

    ready () {
      this.editLink.id = this.$route.params.link;
      this.prepareForm();
    }
  }
</script>