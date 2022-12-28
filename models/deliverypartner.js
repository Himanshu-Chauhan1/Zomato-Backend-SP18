'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcrypt")
const nodeKey = process.env.NODE_KEY

module.exports = (sequelize, DataTypes) => {
  class deliveryPartner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  deliveryPartner.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function setFirstName(val) {
        this.setDataValue('firstName', val.toLocaleLowerCase().trim());
      },
    },
    lastName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set: function setLastName(val) {
        this.setDataValue('lastName', val.toLocaleLowerCase().trim());
      },
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
      unique: true,
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
    bikeAvailable: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function setIsBikeAvailable(val) {
        this.setDataValue('bikeAvailable', val.toLocaleLowerCase().trim());
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
      type: DataTypes.DATE,
      allowNull: false,
      set: function trimValue(val) {
        this.setDataValue('joiningDate', val.trim());
      },
    },
    languagesKnown: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      set: function setIsApproved(val) {
        this.setDataValue('isApproved', val.toLocaleLowerCase().trim());
      },
    },
    userRole: {
      type: DataTypes.STRING,
      defaultValue: "deliverypartner"
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      set: function setIsActive(val) {
        this.setDataValue('isActive', val.toLocaleLowerCase().trim());
      },
    }
  }, {
    sequelize,
    modelName: 'deliveryPartner',
  });
  return deliveryPartner;
};