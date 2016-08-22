<template>
  <div id="app">
    <!-- <sidebar
      :categories="categories"
      v-on:category-selected="setSelectedCategory">
    </sidebar> -->
    <!-- <bookmark-list
      :bookmarks="bookmarks | filterByCategory selectedCategory"
      :categories="categories">
    </bookmark-list> -->
    <sidebar
      :categories="categories"
      v-on:category-selected="setSelectedCategory">
    </sidebar>
    <bookmark-list
      :links="links">
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

    // data() {
    //   return {
    //     categories: {},
    //     bookmarks: {},
    //     selectedCategory: ''
    //   }
    // },

    data () {
      return {
        categories: [],
        links: [],
        selectedCategory: ''
      }
    },

    // filters: {
    //   filterByCategory
    // },

    created () {
      // store.on('data-updated', this.updateListings)
      // store.setDefaultData()
      // this.fetchTaskList()
      store.on('data-updated', this.update)
      this.fetchCategories()
    },

    destroyed () {
      store.removeListener('data-updated', this.update)
    },

    methods: {
      fetchCategories () {
        this.$http.get('http://links.app/categories?include=links').then((response) => {
          this.categories = response.json().data
          this.setSelectedCategory('')
        }, (response) => {
          console.log('error callback')
          console.log(response)
        })
      },

      update () {
      },

      // fetchTaskList () {
      //   const resource = this.$resource('api/tasks{/id}');
      //   // resource.get((tasks) => { // api/tasks
      //   //   console.log(tasks)
      //   // })
      //   resource.get().then((response) => {
      //     console.log(response)
      //   })
      //   // resource.get({ id: 5}, (task) => { // api/tasks/5
      //   //   console.log(task)
      //   // })
      //   // resource.update({ id: 5}, { body: 'Updated body'}, (task) => { // /api/tasks/5
      //   //   console.log(task)
      //   // })
      //   // this.$http.get('api/taks', (tasks) => {
      //   //   console.log(tasks)
      //   // })
      // },

      // updateListings (categories, bookmarks) {
      //   this.categories = categories;
      //   this.bookmarks = bookmarks
      // },

      // setSelectedCategory (category) {
      //   this.selectedCategory = category;
      // }

      setSelectedCategory (category) {
        this.selectedCategory = category

        this.links = (category === '')
          ? this.getLinks(this.categories)
          : this.getLinks(
            this.categories.filter(c => c.name === this.selectedCategory)
          )
          // : this.categories
          //   .find(category => category.name === this.selectedCategory)
          //   .links.data
        
        console.log(this.links)
      },

      getLinks (categories) {
        console.log(categories)
        return categories
          .map(category => category.links.data)
          .reduce((acc, link) => {
          return acc.concat(link)
        }, [])
      }

    }

  }

</script>
