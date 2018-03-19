const { encaseP, Future } = require('fluture')
const { get } = require('axios')
const R = require('ramda')
const $ = require('cheerio')
const { load: html } = require('cheerio')

const getChildren = link =>
  encaseP(get, link)
  .map(R.prop('data'))
  .map(html)
  .map(dom => html(dom('.zg_browseUp + ul').last().html()))
  .map(dom => dom('ul > li > a').toArray().map($))
  .map(R.map(dom => ({ name: dom.text(), link: dom.attr('href') })))
  .map(R.map(R.evolve({ link: R.replace(/\/ref=.*/, '') })))

module.exports = getChildren
