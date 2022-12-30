'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt");
const nodeKey = process.env.NODE_KEY

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models.address, {
        as: "address",
        foreignKey: "userId"
      })
      this.hasMany(models.cart, {
        as: "cart",
        foreignKey: "customerId"
      })
      this.hasMany(models.query, {
        as: "query",
        foreignKey: "userId"
      })
    }
  }
  Customer.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set: function setEmail(val) {
        this.setDataValue('email', val.toLocaleLowerCase().trim());
      },
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set: function trimValue(val) {
        this.setDataValue('phone', val.trim());
      },
    }, //0 to 15 
    password: {
      type: DataTypes.STRING,
      set: function setPassword(val) {
        this.setDataValue('password', bcrypt.hashSync(((val + nodeKey)), 10).trim());
      },
    },
    userRole: {
      type: DataTypes.STRING,
      defaultValue: "customer"
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: true,
    }
  }, {
    sequelize,
    modelName: 'customer',
  });
  return Customer;
};


