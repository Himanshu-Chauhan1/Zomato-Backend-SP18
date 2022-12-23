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
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },//does not required
    queryDescription: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userRole: {
      type: DataTypes.ENUM,
      values: ['customer', 'deliverypartner', 'customersupport', 'restaurant', 'admin', 'superadmin']
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
    modelName: 'Query',
  });
  return Query;
};