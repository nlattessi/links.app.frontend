<template>
	<div class="row">
		<div class="col-md-12">

			<div class="card card-block" v-if="fetching" transition="fade">
        <loader message="Fetching links..."></loader>
			</div>

			<div v-else>

				<div class="card card-block" v-for="category in categories">

					<h3 class="card-title">
						{{category.name}}
						<span class="add-margin-link"><button @click="editCategory(category)" type="button" class="btn btn-info btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></button></span>
						<span class="add-margin-link"><button @click="deleteCategory(category)" type="button" class="btn btn-danger btn-sm"><i class="fa fa-trash" aria-hidden="true"></i></button></span>
					</h3>

					<ul v-if="category.links.data">
						<li v-for="link in category.links.data" class="hover-edit-link">
							<a class="a-link" href="{{link.url}}" target="_blank">{{ link.title ? link.title : link.url }}</a>
							<span class="add-margin-link edit-link"><button @click="editLink(link)" type="button" class="btn btn-info btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></button></span>
							<span class="add-margin-link edit-link"><button @click="deleteLink(link)" type="button" class="btn btn-danger btn-sm"><i class="fa fa-trash" aria-hidden="true"></i></button></span>
						</li>
					</ul>

				</div>

			</div>

		</div>
	</div>
</template>

<script>
  import { default as swal } from 'sweetalert';

  import alertService from '../../alerts';
  import auth from '../../auth';

  import Loader from '../Loader.vue';

  export default {
    components: {
      Loader
    },

    data() {
      return {
        categories: [],
        fetching: false
      }
    },

    methods: {
      editCategory(category) {
        this.$router.go({ name: 'editCategory', params: { category: category.id }});
      },

      editLink(link) {
        this.$router.go({ name: 'editLink', params: { link: link.id }});
      },

      deleteCategory(category) {
        swal({
          title: "Are you sure?",
          text: "Are you sure that you want to delete this category (all links will be deleted also)?",
          type: "warning",
          showCancelButton: true,
          closeOnConfirm: false,
          confirmButtonText: "Yes, delete it!",
          confirmButtonColor: "#ec6c62"
        }, () => {
            this.$http.delete(`${process.env.API_URL_CATEGORIES}/${category.id}`, { headers: auth.getAuthHeader() })
              .then((response) => {
                swal("Deleted!", "Your category was successfully deleted!", "success");
                this.getCategories();
              }, (response) => {
                swal("Oops", "We couldn't connect to the server!", "error");
              });
        });
      },
      
      deleteLink(link) {
        swal({
          title: "Are you sure?",
          text: "Are you sure that you want to delete this link?",
          type: "warning",
          showCancelButton: true,
          closeOnConfirm: false,
          confirmButtonText: "Yes, delete it!",
          confirmButtonColor: "#ec6c62"
        }, () => {
            this.$http.delete(`${process.env.API_URL_LINKS}/${link.id}`, { headers: auth.getAuthHeader() })
              .then((response) => {
                swal("Deleted!", "Your link was successfully deleted!", "success");
                this.getCategories();
              }, (response) => {
                swal("Oops", "We couldn't connect to the server!", "error");
              });
        });
      },

      getCategories() {
        this.fetching = true;
        this.$http.get(process.env.API_URL_CATEGORIES_WITH_LINKS, { headers: auth.getAuthHeader() })
          .then((response) => {
            this.categories = response.body.data;
            this.fetching = false;
          }, (response) => alertService.addAlert('danger', response.body.error.status + ': ' + response.body.error.message));
      }
    },

    ready() {
      this.getCategories();
    }
  }
</script>

<style>
	.add-margin-link {
		margin-left: 10px;
	}
	
	.card-title span.add-margin-link {
		opacity: 0;
		-webkit-transition: opacity .25s ease-in-out;
		transition: opacity .25s ease-in-out;
	}
	
	.card-title:hover span.add-margin-link {
		opacity: 1;
	}
	
	span.edit-link {
		opacity: 0;
		-webkit-transition: opacity .25s ease-in-out;
		transition: opacity .25s ease-in-out;
	}
	
	.hover-edit-link:hover span.edit-link {
		opacity: 1;
	}
</style>