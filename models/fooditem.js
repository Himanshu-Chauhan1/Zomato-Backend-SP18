'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class foodItem extends Model {

    static associate(models) {
      // define association here
      this.hasMany(models.fooditem, {
        as: "fooditem",
        foreignKey: "itemId"
      })
      this.belongsTo(models.restaurant, {
        as: "restaurant",
        foreignKey: "restaurantId"
      })
    }
  }
  foodItem.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    restaurantId: {
      type: DataTypes.UUID,
      references: {
        model: "restaurant",
        key: 'id'
      },
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function setCategoryName(val) {
        this.setDataValue('categoryName', val.trim());
      },
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function setItemName(val) {
        this.setDataValue('itemName', val.trim());
      },
    },
    itemDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function setItemDescription(val) {
        this.setDataValue('itemDescription', val.trim());
      },
    },
    itemPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    itemImage: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function trimValue(val) {
        this.setDataValue('itemImage', val.trim());
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    }
  }, {
    sequelize,
    modelName: 'fooditem',
  });
  return foodItem;
};