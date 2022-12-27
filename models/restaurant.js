'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
        this.setDataValue('name', val.toLocaleLowerCase());
      },
      set: function trimValue(val) {
        this.setDataValue('name', val.trim());
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set: function setEmail(val) {
        this.setDataValue('email', val.toLocaleLowerCase());
      },
      set: function trimValue(val) {
        this.setDataValue('email', val.trim());
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
        this.setDataValue('ownerFullName', val.toLocaleLowerCase());
      },
      set: function trimValue(val) {
        this.setDataValue('ownerFullName', val.trim());
      },
    },
    ownerEmail: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set: function setEmail(val) {
        this.setDataValue('ownerEmail', val.toLocaleLowerCase());
      },
      set: function trimValue(val) {
        this.setDataValue('ownerEmail', val.trim());
      },
    },
    password: {
      type: DataTypes.STRING,
      set: function setPassword(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 10));
      },
      set: function trimValue(val) {
        this.setDataValue('password', val.trim());
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: true,
      set: function setIsActive(val) {
        this.setDataValue('isActive', val.toLocaleLowerCase());
      },
      set: function trimValue(val) {
        this.setDataValue('isActive', val.trim());
      },
    }
  }, {
    sequelize,
    modelName: 'restaurant',
  });
  return restaurant;
};