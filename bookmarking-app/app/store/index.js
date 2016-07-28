import { EventEmitter } from 'events'

const store = new EventEmitter()

let categories = {}
let bookmarks = {}

const guidGenerator = () => {
    const S4 = () => {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1)
    }
    
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())
}

// Use:
//
//     var privateName = ID();
//     var o = { 'public': 'foo' };
//     o[privateName] = 'bar';
const ID = () => {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9)
}

// SEE ALSO: http://fiznool.com/blog/2014/11/16/short-id-generation-in-javascript/

store.setDefaultData = () => {
  // Categories
  const newCategories = Object.assign({}, categories, {
    "Development" : "blue",
    "Design" : "purple"
  })
  categories = newCategories
  
  // Bookmarks
  const newBookmarks = Object.assign({}, bookmarks, {
    "-KE-NI-AQIM8L3ZC8_Ek" : {
      "category" : "Development",
      "title" : "Real-Time Analytics Dashboard",
      "url" : "http://coligo.io/real-time-analytics-with-nodejs-socketio-vuejs/"
    },
    "-KE-Od9opi-E7KvvG-LG" : {
      "category" : "Development",
      "title" : "Building Large-Scale Apps - VueJs",
      "url" : "http://vuejs.org/guide/application.html"
    },
    "-KE-OzR79eW51MP6B-B_" : {
      "category" : "Development",
      "title" : "Firebase Web Quickstart",
      "url" : "https://www.firebase.com/docs/web/quickstart.html"
    },
    "-KE-P94aT_jmOfUJWEJX" : {
      "category" : "Design",
      "title" : "Get started with Electron",
      "url" : "http://electron.atom.io/"
    }
  })
  bookmarks = newBookmarks
  
  store.emit('data-updated', categories, bookmarks)
}

store.addCategory = (category) => { 
  categories = addTo(categories, category)
  store.emit('data-updated', categories, bookmarks)
}

store.deleteCategory = (catName) => {
  if (!('Uncategorized' in categories)) {
    categories = addTo(categories, {'Uncategorized': 'white'})
  }

  for (const key in bookmarks) {
    if (bookmarks[key].category === catName) {
      bookmarks[key].category = 'Uncategorized'
    }
  }

  categories = removeFrom(categories, catName)
  store.emit('data-updated', categories, bookmarks)
}

store.addBookmark = (bookmark) => {
  let newBookmark = {}
  newBookmark[guidGenerator()] = bookmark
  bookmarks = addTo(bookmarks, newBookmark)
  store.emit('data-updated', categories, bookmarks)
}

store.deleteBookmark = (bookmarkId) => {
  bookmarks = removeFrom(bookmarks, bookmarkId)
  store.emit('data-updated', categories, bookmarks)
}

const addTo = (obj, item) => {
  return Object.assign({}, obj, item)
}

const removeFrom = (obj, key) => {
  return Object.keys(obj)
    .filter(key => key !== key)
    .reduce((result, current) => {
      result[current] = obj[current]
      return result
    }, {})
}

export default store
