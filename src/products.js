const { encaseP, parallel, Future } = require('fluture')
const $ = require('cheerio')
const { load: getHtml } = require('cheerio')
const { get } = require('axios')
const R = require('ramda')

const getDom = link =>
  encaseP(get, link)
  .map(R.prop('data'))
  .map(getHtml)

const getProducts = R.pipe(
  getDom,
  R.map(dom => dom('.zg_itemWrapper > .p13n-asin').toArray().map($)),
  R.map(R.map(dom => dom.data('p13n-asin-metadata'))),
  R.map(R.pluck('asin')),
)

const getPages = link =>
  getDom(link)
  .map(dom => dom('li.zg_page > a').length)
  .map(pages => R.range(1, pages + 1))
  .map(R.map(page => link.concat(`?pg=${page}`)))

module.exports = link =>
  getPages(link)
  .map(R.map(getProducts))
  .chain(parallel(1))
  .map(R.flatten)
