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
      this.hasMany(models.query, {
        as: "query",
        foreignKey: "userId"
      })
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
      defaultValue: false
    },
    userRole: {
      type: DataTypes.STRING,
      defaultValue: "deliverypartner"
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
    modelName: 'deliverypartner',
  });
  return deliveryPartner;
};