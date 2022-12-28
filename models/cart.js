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
      allowNull: true,
      set: function trimValue(val) {
        this.setDataValue('customerId', val.trim());
      },
    },
    restaurantId: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function trimValue(val) {
        this.setDataValue('restaurantId', val.trim());
      },
    },
    itemId: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function trimValue(val) {
        this.setDataValue('itemId', val.trim());
      },
    },
    itemQuantity: {
      type: DataTypes.INTEGER,
      set: function trimValue(val) {
        this.setDataValue('itemQuantity', val.trim());
      },
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    totalItems: {
      type: DataTypes.STRING,
      allownull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allownull: true,
      defaultValue: true,
      set: function setIsActive(val) {
        this.setDataValue('isActive', val.toLocaleLowerCase().trim());
      },
    },
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};