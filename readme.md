Scrappes a "Best Sellers List" from Amazon given a link.

# Usage
````javascript
const bestSellers = require('amazon-best-sellers-scraper')

const name = 'Toys & Games'
const link = 'https://www.amazon.com/Best-Sellers-Toys-Games/zgbs/toys-and-games'

bestSellers(link)
.map(bestSellers => ({ name, link, ...bestSellers }))
.fork(console.log, console.log)

// { name: 'Toys & Games',
//   link: 'https://www.amazon.com/Best-Sellers-Toys-Games/zgbs/toys-and-games',
//   products:
//    [ 'B076WSBDW9',
//      'B071LGB5QH',
//      'B00JM5GW10',
//      'B004S8F7QM',
//      'B073PW29V5',
//      ... ],
//   children:
//    [ { name: 'Action & Toy Figures',
//        link: 'https://www.amazon.com/Best-Sellers-Toys-Games-Toy-Figures-Playsets/zgbs/toys-and-games/165993011' },
//      { name: 'Arts & Crafts',
//        link: 'https://www.amazon.com/Best-Sellers-Toys-Games-Arts-Crafts-Supplies/zgbs/toys-and-games/166057011' },
//      { name: 'Baby & Toddler Toys',
//        link: 'https://www.amazon.com/Best-Sellers-Toys-Games-Baby-Toddler/zgbs/toys-and-games/196601011' },
//      { name: 'Bikes, Skates & Ride-Ons',
//        link: 'https://www.amazon.com/Best-Sellers-Toys-Games-Tricycles-Scooters-Wagons/zgbs/toys-and-games/256994011' },
//      { name: 'Building & Construction Toys',
//        link: 'https://www.amazon.com/Best-Sellers-Toys-Games-Building/zgbs/toys-and-games/166092011' },
//      ... ] }
````
