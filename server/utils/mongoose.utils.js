const mongoose = require('mongoose');
const Counter = require('../models/counter.model');

const BASE_62 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const pad = (num, size) => {
  const s = '0'.repeat(size) + num;
  return s.substr(s.length - size);
};

module.exports.withHttp = (url) => (!/^https?:\/\//i.test(url) ? `http://${url}` : url);
module.exports.withoutWWW = (url) => url.replace(/[https*:\\]*www./, '');

module.exports.getNextSequence = async (name) => {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true },
  );
  return counter.seq;
};

module.exports.clearDatabase = async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }

  await Counter.create({ _id: 'linkId', seq: 0 });
};

module.exports.decimalToBaseN = (decimal, baseN) => {
  const remainders = [];
  let newDecimal = decimal;

  while (newDecimal > 0) {
    const quotient = Math.floor(newDecimal / baseN);
    const remainder = newDecimal % baseN;
    newDecimal = quotient;
    remainders.push(remainder);
  }
  const result = remainders.reverse().map((remainder) => BASE_62[remainder]).join('');
  return pad(result, 6);
};

module.exports.baseNToDecimal = (baseVal, baseN) => {
  let sum = 0;
  let index = 0;
  const baseValString = baseVal.toString();
  for (let i = baseValString.length - 1; i >= 0; i--) { // eslint-disable-line no-plusplus
    sum += (baseN ** index) * BASE_62.indexOf(baseValString[i]);
    index += 1;
  }
  return pad(sum, 6);
};

// const getFromBaseToBase = (number, fromBase, toBase) => {
//   const decimal = baseNToDecimal(number, fromBase);
//   return decimalToBaseN(decimal, toBase);
// };
