<template>
	<div class="row">
		<div class="col-md-12">

			<div class="card card-block" v-for="category in categories">

				<h3 class="card-title">
					{{category.name}}
					<span class="add-margin-link"><button @click="editCategory(category)" type="button" class="btn btn-info btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></button></span>
					<span class="add-margin-link"><button @click="deleteCategory(category)" type="button" class="btn btn-info btn-sm"><i class="fa fa-trash" aria-hidden="true"></i></button></span>
				</h3>

				<ul v-if="category.links.data">
					<li v-for="link in category.links.data" class="hover-edit-link">
						<a class="a-link" href="{{link.url}}" target="_blank">{{ link.title ? link.title : link.url }}</a>
						<span class="add-margin-link edit-link"><button @click="editLink(link)" type="button" class="btn btn-info btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></button></span>
					</li>
				</ul>

			</div>

		</div>
	</div>
</template>

<script>
  import alertService from '../../alerts';
  import auth from '../../auth';

  import { default as swal } from 'sweetalert';

  export default {
    props: [ 'messages' ],

    data() {
      return {
        categories: []
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
        // swal("Oops!", "Something went wrong on the page!", "error");
        //console.log(sweetalert);
        //sweetalert.default("Oops!", "Something went wrong on the page!", "error");

        swal({
          title: "Are you sure?",
          text: "Are you sure that you want to delete this category?",
          type: "warning",
          showCancelButton: true,
          closeOnConfirm: false,
          confirmButtonText: "Yes, delete it!",
          confirmButtonColor: "#ec6c62"
        }, () => {
            // console.log('DELETE CATEGORY');
            // swal("Deleted!", "Your file was successfully deleted!", "success");

            this.$http.delete(`${process.env.API_URL_CATEGORIES}/${category.id}`, { headers: auth.getAuthHeader() })
              .then((response) => {
                swal("Deleted!", "Your file was successfully deleted!", "success");
                this.getCategories();
              }, (response) => {
                swal("Oops", "We couldn't connect to the server!", "error");
              });



            /*$.ajax({
            url: "/api/photos/" + photoId,
            type: "DELETE"
            })
            .done(function(data) {
            swal("Deleted!", "Your file was successfully deleted!", "success");
            })
            .error(function(data) {
            swal("Oops", "We couldn't connect to the server!", "error");
            });*/
        });
      },

      getCategories() {
        this.$http.get(process.env.API_URL_CATEGORIES_WITH_LINKS, { headers: auth.getAuthHeader() })
          .then((response) => {
            this.categories = response.body.data
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