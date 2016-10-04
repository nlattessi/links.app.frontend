<template>
  <base-modal :show.sync="show" :on-close="close">
    <div class="modal-header">
      <h3>New Link</h3>
    </div>

    <div class="modal-body">
      <label class="form-label">Title<input v-model="title" class="form-control"></label>
      <label class="form-label">Url<input v-model="url" class="form-control"></label>
      <label class="form-label">Name<input v-model="name" class="form-control"></label>
    </div>

    <div class="modal-footer text-right">
      <button class="modal-default-button" @click="addCategory()">
        Add Category
      </button>
    </div>
    </modal>
</template>

<script>
  import auth from '../auth'
  import BaseModal from './BaseModal'

  export default {

    components: {
      BaseModal
    },

    props: ['show'],

    data () {
      return {
        title: '',
        url: ''
      }
    },
    
    methods: {
      close() {
        this.show = false
        this.title = ''
        this.url = ''
      },

      addCategory() {

        const data = {
          name: this.name
        }

        console.log('broadcasted addedCategory')
        this.$dispatch('addedCategory', data)
        this.close()

        // this.$http.post('https://dry-shore-86449.herokuapp.com/user/categories', data, auth.getAuthHeader()).then((response) => {
        //   console.log(response)
        //   this.close()

        //   this.$broadcast('addedCategory', response)
        //   console.log('broadcasted addedCategory')
        // }, (response) => {
        //   console.log(response)
        //   this.close()
        // })
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
  
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
  }
  
  .modal-container {
    width: 300px;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  
  .modal-body {
    margin: 20px 0;
  }
  
  .text-right {
    text-align: right;
  }
  
  .form-label {
    display: block;
    margin-bottom: 1em;
  }
  
  .form-label > .form-control {
    margin-top: 0.5em;
  }
  
  .form-control {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid #ddd;
  }
  
  .modal-enter,
  .modal-leave {
    opacity: 0;
  }
  
  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>