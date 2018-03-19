const bestSellers = require('./index')

const name = 'Toys & Games'
const link = 'https://www.amazon.com/Best-Sellers-Toys-Games/zgbs/toys-and-games'

bestSellers(link)
.map(bestSellers => ({ name, link, ...bestSellers }))
.fork(console.log, console.log)
