const { Sequelize } = require('sequelize');

require("dotenv").config();

// const {DATABASE, USERNAME, PASSWORD, HOST, DIALECT} = process.env;

// const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
//   host: HOST,
//   dialect: DIALECT
// });

const { DBURI } = process.env;

const sequelize = new Sequelize(DBURI, {
    dialect: 'mysql',
    dialectModule: require('mysql2')
});

module.exports = sequelize;
