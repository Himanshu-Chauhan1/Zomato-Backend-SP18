'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {

    static associate(models) {
      // define association here
      this.belongsTo(models.customer, {
        as: "customer",
        foreignKey: "userId"
      })
      this.belongsTo(models.restaurant, {
        as: "restaurant",
        foreignKey: "userId"
      })
      this.belongsTo(models.admin, {
        as: "admin",
        foreignKey: "userId"
      })
      this.belongsTo(models.customersupport, {
        as: "customersupport",
        foreignKey: "userId"
      })
      this.belongsTo(models.deliverypartner, {
        as: "deliverypartner",
        foreignKey: "userId"
      })
      this.belongsTo(models.order, {
        as: "order",
        foreignKey: "deliveryAddressId"
      })
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
        model: "customer",
        model: "restaurant",
        model: "admin",
        model: "customersupport",
        model: "deliverypartner",
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
    modelName: 'address',
  });
  return Address;
};

