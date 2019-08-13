const Counter = require('../models/counter.model')

module.exports.getNextSequence = async name => {
  // const counter = await Counter.findOne({ _id: name})
  // counter.seq++
  // await counter.save()
  // return counter.seq;

  // Counter.findOne({_id: name}).then(counter => counter.)
}

const BASE_62 = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

const decimalToBaseN = (decimal, baseN) => {
  const remainders = [];

  while (decimal > 0) {
    quotient = Math.floor(decimal / baseN)
    remainder = decimal % baseN
    decimal = quotient
    remainders.push(remainder)
  }

  return remainders.reverse().map(remainder => BASE_62[remainder]).join('')
}

const baseNToDecimal = (baseVal, baseN) => {
  let sum = 0;
  let index = 0;
  baseVal = baseVal.toString();
  for (let i = baseVal.length-1; i >= 0; i--) {
    sum += (baseN**index) * BASE_62.indexOf(baseVal[i]);
    index++;
  }
  return sum
}

const getFromBaseToBase = (number, fromBase, toBase) => {
  const decimal = baseNToDecimal(number, fromBase);
  return decimalToBaseN(decimal, toBase);
}