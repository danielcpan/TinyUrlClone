const mongoose = require('mongoose');
const Counter = require('../models/counter.model');

module.exports.getNextSequence = async (name) => {
  const counter = await Counter.findOneAndUpdate(
    { _id: name }, 
    { $inc: { seq: 1 }}, 
    { new: true }
  )
  return counter.seq;
};

const BASE_62 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

module.exports.clearDatabase = async () => {
  await mongoose.connection.db.dropDatabase()
  await Counter.create({_id: 'linkId', seq: 0})
};

module.exports.decimalToBaseN = (decimal, baseN) => {
  const remainders = [];

  while (decimal > 0) {
    quotient = Math.floor(decimal / baseN);
    remainder = decimal % baseN;
    decimal = quotient;
    remainders.push(remainder);
  }
  const result = remainders.reverse().map((remainder) => BASE_62[remainder]).join('');
  return pad(result, 6)
};

module.exports.baseNToDecimal = (baseVal, baseN) => {
  let sum = 0;
  let index = 0;
  baseVal = baseVal.toString();
  for (let i = baseVal.length - 1; i >= 0; i--) {
    sum += (baseN ** index) * BASE_62.indexOf(baseVal[i]);
    index++;
  }
  return pad(sum, 6)
};

const pad = (num, size) => {
  var s = "0".repeat(size) + num;
  return s.substr(s.length-size);
}

const getFromBaseToBase = (number, fromBase, toBase) => {
  const decimal = baseNToDecimal(number, fromBase);
  return decimalToBaseN(decimal, toBase);
};
