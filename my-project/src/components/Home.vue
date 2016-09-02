<template>
    <div class="hello">
        <h1>{{ msg }}</h1>

        <ul id="example-1">
            <li v-for="link in links">
                <a href="{{ link.url }}">{{ link.url }}</a>
            </li>
        </ul>

    </div>
</template>

<script>
import * as localForage from 'localforage'

export default {
  data () {
    return {
      msg: 'Links',
      links: []
    }
  },


  ready () {

    localForage.getItem('accessToken').then((value) => {
        // This code runs once the value has been loaded
        // from the offline store.
        console.log(value)

        this.$http.get('https://dry-shore-86449.herokuapp.com/user/links', {headers: {Authorization: `Bearer ${value}`} }).then((response) => {

            console.log('success')

            // this.links = response.json()
            console.log(response.json().data)
            this.links = response.json().data

        }).catch((response) => {

            console.log('error')

        })

        // this.$http.get('https://dry-shore-86449.herokuapp.com/user/links', {
        //   headers: {
        //       Authorization: `Bearer ${value}`
        //     }
        // }, (response) => {
        //     console.log('success')
        //     console.log(response.json().data)
        //     // this.links = response.json().data
        //     // console.log(this.links)
        // }, (response) => {
        //     console.log(error)
        // })


    }).catch((err) => {
        // This code runs if there were any errors
        console.log(err)
    })

      

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1 {
        color: #42b983;
    }
</style>