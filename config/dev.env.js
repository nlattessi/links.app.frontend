var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL_LOGIN: '"http://links.app/auth/login"',
  API_URL_FACEBOOK_LOGIN: '"http://links.app/auth/facebook"',
  API_URL_GOOGLE_LOGIN: '"http://links.app/auth/google"',
  API_URL_REGISTER: '"http://links.app/auth/register"',
  API_URL_REFRESH: '"http://links.app/auth/refresh"',
  API_URL_CATEGORIES: '"http://links.app/user/categories"',
  API_URL_CATEGORIES_WITH_LINKS: '"http://links.app/user/categories?include=links"',
  API_URL_LINKS: '"http://links.app/user/links"'
})
