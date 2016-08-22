<template>
  <div id="links-container">
    <div id="toolbar">
      <div class="ui inverted icon fluid input">
        <input v-model="query" type="text" placeholder="Filter your links...">
        <i class="search icon"></i>
      </div>
    </div>
    <!-- <div class="ui relaxed divided selection list">
      <bookmark v-for="(id, bookmark) in bookmarks | filterByTitle query"
        :id="id"
        :title="bookmark.title"
        :url="bookmark.url"
        :category="bookmark.category"
        :category-color="categories[bookmark.category]">
      </bookmark>
    </div> -->
    <div class="ui relaxed divided selection list">
      <bookmark v-for="link in links | filterByTitle query"
        :id="link.id"
        :title="link.title"
        :url="link.url"
        :category="link.category">
      </bookmark>
    </div>
  </div>
</template>

<script>
  import Bookmark from './Bookmark.vue'
  import { filterByTitle } from '../filters'

  export default {

    data () {
      return {
        query: ''
      }
    },

    // props: ['bookmarks', 'categories'],
    props: ['links'],
    
    components: {
      Bookmark
    },

    filters: {
      filterByTitle
    }

  }

</script>
