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
      type: DataTypes.UUID,
      allowNull: true
    },
    itemId: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    itemQuantity: {
      type: DataTypes.STRING,
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    totalItems: {
      type: DataTypes.STRING,
      allownull: true
    },
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};