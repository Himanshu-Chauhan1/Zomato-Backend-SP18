'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt");
const nodeKey = process.env.NODE_KEY

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
        this.setDataValue('name', val.toLocaleLowerCase().trim());
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
        this.setDataValue('ownerFullName', val.toLocaleLowerCase().trim());
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
    userRole: {
      type: DataTypes.STRING,
      defaultValue: "restaurant"
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      default: true,
      set: function setIsActive(val) {
        this.setDataValue('isActive', val.toLocaleLowerCase().trim());
      },
    }
  }, {
    sequelize,
    modelName: 'restaurant',
  });
  return restaurant;
};