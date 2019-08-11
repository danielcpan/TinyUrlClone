// const BASE_62 = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z' ]

// const decimalToBase = (decimal, base) => {
//   const remainders = [];

//   while (decimal > 0) {
//     quotient = Math.floor(decimal / base)
//     remainder = decimal % base
//     decimal = quotient
//     remainders.push(remainder)
//   }

//   return remainders.reverse().map(remainder => BASE_62[remainder]).join('')
// }

// decimalToBase(10,2)

/* eslint no-console: 0 */

const app = require('./app');
const { PORT, PUBLIC_URL } = require('./config/config');

app.listen(PORT, () => console.log(`🚀 Server ready at ${PUBLIC_URL}`));
