'use strict';
const { Model } = require('sequelize');

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
    itemQuantity: {
      type: DataTypes.INTEGER,
    },
    customerId: {
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: 'customers',
        },
        key: 'id'
      },
      allowNull: false
    },
    restaurantId: {
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: 'restaurants',
        },
        key: 'id'
      },
      allowNull: false
    },
    itemId: {
      type: DataTypes.UUID,
      references: {
        model: {
          tableName: 'foodItems',
        },
        key: 'id'
      },
      allowNull: false
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