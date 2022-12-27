'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Query extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function trimValue(val) {
        this.setDataValue('userId', val.trim());
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
      allowNull: false,
      set: function setIsRequest(val) {
        this.setDataValue('isRequest', val.toLocaleLowerCase().trim());
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      set: function setIsActive(val) {
        this.setDataValue('isActive', val.toLocaleLowerCase().trim());
      },
    },
  }, {
    sequelize,
    modelName: 'Query',
  });
  return Query;
};