const { encaseP, parallel, Future } = require('fluture')
const { get } = require('axios')
const R = require('ramda')
const $ = require('cheerio')
const { load: html } = require('cheerio')
const sample = require('lodash.samplesize')
const { render } = require('prettyjson')

const categories = require('./categories')

const genesys = 'https://www.amazon.com/Best-Sellers/zgbs'

const pages = link =>
  encaseP(get, link)
  .map(R.prop('data'))
  .map(html)
  .map(dom => dom('.zg_pagination > li').length)
  .map(pages => R.range(1, pages + 1))
  .map(R.map(R.toString))
  .map(R.map(R.concat(`${link}/?pg=`)))

const page = link =>
  encaseP(get, link)
  .map(R.prop('data'))
  .map(html)
  .map(dom => dom('div.zg_itemImmersion > div:nth-child(2) > div:nth-child(1)'))
  .map(dom => dom.toArray().map($))
  .map(R.map(dom => dom.data('p13n-asin-metadata')))
  .map(R.map(R.prop('asin')))

// const tops = link =>
//   pages(link)
//   .map(R.map(page))
//   .chain(parallel(1))
//   .map(R.flatten)

// const tops =

const data =
  encaseP(get, genesys)
  .map(R.prop('data'))
  .map(html)
  .map(dom => dom('#zg_browseRoot > ul:nth-child(2) > li > a'))
  .map(dom => dom.toArray().map($))
  .map(R.map(dom => ({ name: dom.text(), link: dom.attr('href') })))
  .map(R.map(R.evolve({ link: R.replace(/\/ref=.*/, '') })))

data
.map(sample)
.map(R.map(categories))
.chain(parallel(1))
.map(render)
.fork(console.log, console.log)
