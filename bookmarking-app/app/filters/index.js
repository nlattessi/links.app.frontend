// export function filterByTitle (value, title) {
//   return filterBookmarks(value, 'title', title)
// }
export function filterByTitle (links, title) {
  if (! title) return links
  return links.filter(l => l.title.includes(title))
  // this.categories.filter(c => c.name === this.selectedCategory)
}

export function filterByCategory (value, category) {
  if (!category) return value
  return filterBookmarks(value, 'category', category)
}

// TODO: refactor to functional programming
function filterBookmarks (bookmarks, filterBy, filterValue) {
  let filteredBookmarks = {}
  for (const bookmark in bookmarks) {
    if (bookmarks[bookmark][filterBy].indexOf(filterValue) > -1) {
      filteredBookmarks[bookmark] = bookmarks[bookmark]
    }
  }
  return filteredBookmarks
}
