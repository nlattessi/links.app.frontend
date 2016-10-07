<template>
  <div class="row">
    <div class="col-md-12">

      <div class="card card-block" v-for="category in categories">

        <h3 class="card-title">
          {{category.name}}
          <span class="add-margin-link"><button @click="edit(category)" type="button" class="btn btn-info btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></button></span>
        </h3>

        <ul v-if="category.links.data">
          <li v-for="link in category.links.data">
            <a href="{{link.url}}">{{ link.title ? link.title : link.url }}</a>
          </li>
        </ul>

      </div>

    </div>
  </div>
</template>

<script>
  import alertService from '../../alerts';
  import auth from '../../auth';

  export default {
    props: [ 'messages' ],

    data() {
      return {
        categories: []
      }
    },

    methods: {
      edit(category) {
        console.log('edit category :: ', category.name);
      },

      getCategories() {
        this.$http.get(process.env.API_URL_CATEGORIES_WITH_LINKS, { headers: auth.getAuthHeader() })
          .then((response) => {
            this.categories = response.body.data
          }, (response) => {
            // this.alerts.push({
            //   type: 'danger',
            //   message: response.body.error.status + ': ' + response.body.error.message
            // });
            alertService.addAlert('danger', response.body.error.status + ': ' + response.body.error.message);
          });
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
</style>