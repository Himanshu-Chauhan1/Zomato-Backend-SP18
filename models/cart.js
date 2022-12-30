'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {

    static associate(models) {
      // define association here
      this.belongsTo(models.customer, {
        as: "customer",
        foreignKey: "customerId"
      })
      this.belongsTo(models.restaurant, {
        as: "restaurant",
        foreignKey: "restaurantId"
      })
      this.belongsTo(models.fooditem, {
        as: "fooditem",
        foreignKey: "itemId"
      })
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
        model: "customer",
        key: 'id'
      },
      allowNull: false
    },
    restaurantId: {
      type: DataTypes.UUID,
      references: {
        model: "restaurant",
        key: 'id'
      },
      allowNull: false
    },
    itemId: {
      type: DataTypes.UUID,
      references: {
        model: "fooditem",
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
    modelName: 'cart',
  });
  return Cart;
};