/* eslint no-console: 0 */

const app = require('./app');
const { PORT, PUBLIC_URL } = require('./config/config');

app.listen(PORT, () => console.log(`🚀 Server ready at ${PUBLIC_URL}`));


// db.counters.findAndModify(
//   {
//     query: { _id: 'linkid' },
//     update: { $inc: { seq: 1 } },
//     new: true
//   }
// );