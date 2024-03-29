'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt");
const nodeKey = process.env.NODE_KEY

module.exports = (sequelize, DataTypes) => {
  class restaurant extends Model {

    static associate(models) {
      // define association here
      this.hasMany(models.cart, {
        as: "cart",
        foreignKey: "restaurantId"
      })
      this.hasMany(models.fooditem, {
        as: "fooditem",
        foreignKey: "restaurantId"
      })
      this.hasMany(models.offer, {
        as: "offer",
        foreignKey: "restaurantId"
      })
      this.hasMany(models.foodcategory, {
        as: "foodcategory",
        foreignKey: "restaurantId"
      })
      this.hasMany(models.query, {
        as: "query",
        foreignKey: "userId"
      })
      this.hasMany(models.order, {
        as: "order",
        foreignKey: "restaurantId"
      })
      this.hasMany(models.location, {
        as: "location",
        foreignKey: "restaurantId"
      })
    }
  }
  restaurant.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function setName(val) {
        this.setDataValue('name', val.trim());
      },
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
      allowNull: false,
      set: function trimValue(val) {
        this.setDataValue('phone', val.trim());
      },
    },
    landline: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function trimValue(val) {
        this.setDataValue('landline', val.trim());
      },
    },
    ownerFullName: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function setOwnerFullName(val) {
        this.setDataValue('ownerFullName', val.trim());
      },
    },
    ownerEmail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set: function setEmail(val) {
        this.setDataValue('ownerEmail', val.toLocaleLowerCase().trim());
      },
    },
    password: {
      type: DataTypes.STRING,
      set: function setPassword(val) {
        this.setDataValue('password', bcrypt.hashSync(((val + nodeKey)), 10).trim());
      },
    },
    coordinates: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    radiusInKM: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 5
    },
    restaurantAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userRole: {
      type: DataTypes.STRING,
      defaultValue: "restaurant"
    },
    resetLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: true,
    }
  }, {
    sequelize,
    modelName: 'restaurant',
  });
  return restaurant;
};