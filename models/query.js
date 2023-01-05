'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Query extends Model {

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
    }
  }
  Query.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function trimValue(val) {
        this.setDataValue('orderId', val.trim());
      },
    },
    queryDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function setQueryDescription(val) {
        this.setDataValue('queryDescription', val.toLocaleLowerCase().trim());
      },
    },
    userRole: {
      type: DataTypes.ENUM,
      values: ['customer', 'deliverypartner', 'customersupport', 'restaurant', 'admin', 'superadmin'],
      set: function setUserRole(val) {
        this.setDataValue('userRole', val.toLocaleLowerCase().trim());
      },
    },
    isRequest: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'query',
  });
  return Query;
};