'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt")
module.exports = (sequelize, DataTypes) => {
  class customerSupport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customerSupport.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      set: function setPassword(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 10));
      },
    },
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    joiningDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'customerSupport',
  });
  return customerSupport;
};