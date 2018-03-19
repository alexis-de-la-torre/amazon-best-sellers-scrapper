const { parallel } = require('fluture')
const { zipObj } = require('ramda')

const getChildren = require('./src/children')
const getProducts = require('./src/products')

const bestSellers = link =>
  parallel(2, [ getProducts(link), getChildren(link) ])
  .map(zipObj([ 'products', 'children' ]))

module.exports = bestSellers
