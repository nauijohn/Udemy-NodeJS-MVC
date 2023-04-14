// const mysql = require('mysql2');

// const pool = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'node-complete',
//   password: 'Lit59ogd7zie!',
// });

// module.exports = pool.promise();

// const Sequelize = require('sequelize').Sequelize;

// const sequelize = new Sequelize('node-complete', 'root', 'Lit59ogd7zie!', {
//   dialect: 'mysql',
//   host: 'localhost',
// });

// module.exports = sequelize;

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    // 'mongodb+srv://anthonynaui:SD1P2HDLEytfUR7F@cluster0.3evqc5m.mongodb.net/test'
    'mongodb+srv://anthonynaui:SD1P2HDLEytfUR7F@cluster0.3evqc5m.mongodb.net/shop?retryWrites=true&w=majority'
  )
    .then(client => {
      // console.log('client: ', client);
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) return _db;
  throw 'No database found';
};

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
