const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');

const syncDatabase = async () => {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');
};

module.exports = { sequelize, User, Product, syncDatabase };
