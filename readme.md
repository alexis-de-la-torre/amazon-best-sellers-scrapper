Scrappes a "Best Sellers List" from Amazon given a link.

# Usage
````javascript
const bestSellers = require('amazon-best-sellers-scraper')

const name = 'Toys & Games'
const link = 'https://www.amazon.com/Best-Sellers-Toys-Games/zgbs/toys-and-games'

bestSellers(link)
.map(bestSellers => ({ name, link, ...bestSellers }))
.fork(console.log, console.log)
````
