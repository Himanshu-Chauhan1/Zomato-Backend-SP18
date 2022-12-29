'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.Customer, {
      //   as: "Address",
      //   foreignKey: "userId"
      // })
    };

  }
  Address.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: 'customers',
          tableName: 'restaurants',
          tableName: 'Admins',
          tableName: 'customerSupports',
          tableName: 'deliveryPartners',
        },
        key: 'id'
      },
      allowNull: false
    },
    userRole: {
      type: DataTypes.ENUM,
      values: ['customer', 'deliverypartner', 'customersupport', 'restaurant', 'admin', 'superadmin'],
      set: function setUserRole(val) {
        this.setDataValue('userRole', val.toLocaleLowerCase().trim());
      },
    },
    streetName: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function setStreetName(val) {
        this.setDataValue('streetName', val.toLocaleLowerCase().trim());
      },
    },
    cityName: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function setCityName(val) {
        this.setDataValue('cityName', val.toLocaleLowerCase().trim());
      },
    },
    stateName: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function setStateName(val) {
        this.setDataValue('stateName', val.toLocaleLowerCase().trim());
      },
    },
    pincode: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function trimValue(val) {
        this.setDataValue('pincode', val.trim());
      },
    },
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};

