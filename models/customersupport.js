'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt")
const nodeKey = process.env.NODE_KEY

module.exports = (sequelize, DataTypes) => {
  class customerSupport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.query, {
        as: "query",
        foreignKey: "userId"
      })
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
      set: function setGender(val) {
        this.setDataValue('gender', val.toLocaleLowerCase().trim());
      },
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function trimValue(val) {
        this.setDataValue('dob', val.trim());
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
    bloodGroup: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function trimValue(val) {
        this.setDataValue('bloodGroup', val.trim());
      },
    },
    joiningDate: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function trimValue(val) {
        this.setDataValue('joiningDate', val.trim());
      },
    },
    departmentName: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function setDepartmentName(val) {
        this.setDataValue('departmentName', val.trim());
      },
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    userRole: {
      type: DataTypes.STRING,
      defaultValue: "customersupport"
    },
    resetLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'customersupport',
  });
  return customerSupport;
};