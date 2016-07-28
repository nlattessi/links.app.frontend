Vue.component('navbar', {
  template: '#navbar-template'
})

var vm = new Vue({
  el: '#app'
})

var vm = new Vue({
  el: '#app-links',
  data: {
    categories: [
        { name: 'Cat 1', links: [
            { url: 'https://www.google.com.ar/?gws_rd=ssl', title: 'Google' },
            { url: 'https://gist.github.com/nlattessi/26079bb306ad6350159a76657b1eaccd', title: 'https://gist.github.com/nlattessi/26079bb306ad6350159a76657b1eaccd' },
        ]},
        { name: 'Cat 2', links: [
            { url: 'https://www.gog.com/', title: 'Gog' },
            { url: 'http://store.steampowered.com/', title: 'http://store.steampowered.com/' },
        ]},
    ]
  }
})

var vm2 = new Vue({
  el: '#vue-instance',
  data: {
    inventory: [
      {name: 'MacBook Air', price: 1000},
      {name: 'MacBook Pro', price: 1800},
      {name: 'Lenovo W530', price: 1400},
      {name: 'Acer Aspire One', price: 300}
    ]
  }
});
