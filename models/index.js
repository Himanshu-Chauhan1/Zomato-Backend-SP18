'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const customerModel = require('./customer')
const restaurantModel = require('./restaurant')
const adminModel = require('./admin')
const customerSupportModel = require('./customersupport')
const deliveryPartnerModel = require('./deliverypartner')
const foodItemModel = require('./fooditem')
const foodCategoryModel = require('./foodcategory')
const cartModel = require('./cart')
const offerModel = require('./offer')
const queryModel = require('./query')
const addressModel = require('./address')
const orderModel = require('./order')
const superAdminModel = require('./superadmin')
const issueModel=require('./issue')
const locationModel=require('./location')


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const Customer = customerModel(sequelize, Sequelize)
const Restaurant = restaurantModel(sequelize, Sequelize)
const Admin = adminModel(sequelize, Sequelize)
const CustomerSupport = customerSupportModel(sequelize, Sequelize)
const DeliveryPartner = deliveryPartnerModel(sequelize, Sequelize)
const FoodItem = foodItemModel(sequelize, Sequelize)
const FoodCategory = foodCategoryModel(sequelize, Sequelize)
const Cart = cartModel(sequelize, Sequelize)
const Offer = offerModel(sequelize, Sequelize)
const Query = queryModel(sequelize, Sequelize)
const Address = addressModel(sequelize, Sequelize)
const Order = orderModel(sequelize, Sequelize)
const SuperAdmin = superAdminModel(sequelize, Sequelize)
const Issue = issueModel(sequelize, Sequelize)
const Location = locationModel(sequelize, Sequelize)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
  db,
  Customer,
  Restaurant,
  Admin,
  CustomerSupport,
  DeliveryPartner,
  FoodItem,
  FoodCategory,
  Cart,
  Offer,
  Query,
  Address,
  Order,
  SuperAdmin,
  Issue,
  Location
};
