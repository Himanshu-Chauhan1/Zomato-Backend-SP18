'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class foodCategory extends Model {
 
    static associate(models) {
      // define association here
      this.belongsTo(models.restaurant, {
        as: "restaurant",
        foreignKey: "restaurantId"
      })
    }
  }
  foodCategory.init({
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
        this.setDataValue('categoryName', val.toLocaleLowerCase().trim());
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true,
      set: function setIsActive(val) {
        this.setDataValue('isActive', val.toLocaleLowerCase().trim());
      },
    }
  }, {
    sequelize,
    modelName: 'foodcategory',
  });
  return foodCategory;
};