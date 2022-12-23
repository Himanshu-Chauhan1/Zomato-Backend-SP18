'use strict';
const {
  Model, UUID
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    itemId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    itemQuantity: {
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    totalItems: {
      type: DataTypes.STRING,
      allownull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allownull: true,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};