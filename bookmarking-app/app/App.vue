<template>
  <div id="app">
    <sidebar
      :categories="categories"
      v-on:category-selected="setSelectedCategory">
    </sidebar>
    <bookmark-list
      :bookmarks="bookmarks | filterByCategory selectedCategory"
      :categories="categories">
    </bookmark-list>
  </div>
</template>

<script>
  import store from './store'
  import Sidebar from './components/Sidebar.vue'
  import BookmarkList from './components/BookmarkList.vue'
  import { filterByCategory } from './filters'

  export default {

    components: {
      Sidebar,
      BookmarkList
    },

    data() {
      return {
        categories: {},
        bookmarks: {},
        selectedCategory: ''
      }
    },

    filters: {
      filterByCategory
    },

    data () {
      return {
        list: []
      }
    },

    created () {
      store.on('data-updated', this.updateListings)
      store.setDefaultData()

      this.fetchTaskList()
    },

    methods: {
      fetchTaskList () {

        const resource = this.$resource('api/tasks{/id}');

        // resource.get((tasks) => { // api/tasks
        //   console.log(tasks)
        // })

        resource.get().then((response) => {
          console.log(response)
        })

        // resource.get({ id: 5}, (task) => { // api/tasks/5
        //   console.log(task)
        // })

        // resource.update({ id: 5}, { body: 'Updated body'}, (task) => { // /api/tasks/5
        //   console.log(task)
        // })

        // this.$http.get('api/taks', (tasks) => {
        //   console.log(tasks)
        // })
      },

      updateListings (categories, bookmarks) {
        this.categories = categories;
        this.bookmarks = bookmarks
      },

      setSelectedCategory (category) {
        this.selectedCategory = category;
      }

    }

  }

</script>