'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt");
const nodeKey = process.env.NODE_KEY

module.exports = (sequelize, DataTypes) => {
  class superadmin extends Model {

    static associate(models) {
      // define association here
    }
  }
  superadmin.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
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
    },
    password: {
      type: DataTypes.STRING,
      set: function setPassword(val) {
        this.setDataValue('password', bcrypt.hashSync(((val + nodeKey)), 10).trim());
      },
    },
    userRole: {
      type: DataTypes.STRING,
      defaultValue: "superadmin"
    },
  }, {
    sequelize,
    modelName: 'superadmin',
  });
  return superadmin;
};