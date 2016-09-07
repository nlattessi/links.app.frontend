<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <ul id="example-1">
      <li v-for="category in categories">
          <h1>{{ category.name }}</h1>
          <ul>
              <li v-for="links in category.links.data">
                  <a href="{{ link.url }}">{{ link.url }}</a>
              </li>
          </ul>
      </li>
    </ul>

  </div>
</template>

<script>
// import * as localForage from 'localforage'
import auth from '../auth'

export default {
  data () {
    return {
      msg: 'Links',
      categories: []
    }
  },

  ready () {

      const token = localStorage.getItem('id_token')

      this.$http.get('https://dry-shore-86449.herokuapp.com/user/categories?include=links', { headers: auth.getAuthHeader() }).then((response) => {
        // success callback
        this.categories = response.json().data
      }, (response) => {
        // error callback
        console.log(response)
      })

      // this.$http.get('https://dry-shore-86449.herokuapp.com/user/links', (data) => {
      //     this.links = data.data
      // }, {
      //     headers: auth.getAuthHeader()
      // })
      // .error((err) => {
      //     console.log(err)
      // })

    // localForage.getItem('accessToken').then((value) => {
    //     // This code runs once the value has been loaded
    //     // from the offline store.
    //     console.log(value)

    //     this.$http.get('https://dry-shore-86449.herokuapp.com/user/links', {headers: {Authorization: `Bearer ${value}`} }).then((response) => {

    //         console.log('success')

    //         // this.links = response.json()
    //         console.log(response.json().data)
    //         this.links = response.json().data

    //     }).catch((response) => {

    //         console.log('error')

    //     })

    //     // this.$http.get('https://dry-shore-86449.herokuapp.com/user/links', {
    //     //   headers: {
    //     //       Authorization: `Bearer ${value}`
    //     //     }
    //     // }, (response) => {
    //     //     console.log('success')
    //     //     console.log(response.json().data)
    //     //     // this.links = response.json().data
    //     //     // console.log(this.links)
    //     // }, (response) => {
    //     //     console.log(error)
    //     // })


    // }).catch((err) => {
    //     // This code runs if there were any errors
    //     console.log(err)
    // })
  },
  
  route: {
    canActivate() {
      return auth.user.authenticated
    }    
  }

}
</script>