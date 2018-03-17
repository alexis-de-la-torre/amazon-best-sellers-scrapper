const { get } = require('axios')
const { Future, parallel, encaseP } = require('fluture')
const R = require('ramda')
const $ = require('cheerio')
const { load: html } = require('cheerio')
const sample = require('lodash.samplesize')

const dev = process.env.NODE_ENV !== 'production'

const test = [{
  name: 'Toys & Games',
  link: 'https://www.amazon.com/Best-Sellers-Toys-Games/zgbs/toys-and-games/'
}]

const getChildren = (link, name) =>
  encaseP(get, link)
  .map(R.tap(() => console.log(name)))
  .map(R.prop('data'))
  .map(html)
  .map(dom => html(dom('.zg_browseUp + ul').last().html()))
  .map(dom => dom('ul > li > a').toArray().map($))
  .map(R.map(dom => ({ name: dom.text(), link: dom.attr('href') })))

const categories = genesis => Future((reject, resolve) => {
  let acc = []
  let count = 0

  const rec = (children) => {
    if (count > 2) resolve(R.uniq(acc.map(R.prop('name'))).length)
    else {
      parallel(1, children.map(({ name, link }) => getChildren(link, name)))
      .map(R.flatten)
      .fork(reject, categories => {
        // console.log(R.pluck('name', acc))
        // console.log(R.pluck('name', children))
        // console.log('-------')

        count += 1
        acc = acc.concat(categories)
        // acc = categories
        rec(categories)
      })
    }
  }

  rec(test)

  // getChildren(test.link)
  // .fork(reject, console.log)
  // .map(x => dev ? R.take(1, x) : x)
  // .fork(reject, children => rec('Toys & Games', 'https://www.amazon.com/Best-Sellers-Toys-Games/zgbs/toys-and-games', children))
})

module.exports = categories
