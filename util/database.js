// const mysql = require('mysql2');

// const pool = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'node-complete',
//   password: 'Lit59ogd7zie!',
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('node-complete', 'root', 'Lit59ogd7zie!', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
