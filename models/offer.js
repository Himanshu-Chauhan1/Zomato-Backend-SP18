'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Offer.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    restaurantId: {
      type: DataTypes.UUID,
      allowNull: true,
      set: function trimValue(val) {
        this.setDataValue('restaurantId', val.trim());
      },
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function setCategoryName(val) {
        this.setDataValue('categoryName', val.toLocaleLowerCase());
      },
      set: function trimValue(val) {
        this.setDataValue('categoryName', val.trim());
      },
    },
    offerName: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function setOfferName(val) {
        this.setDataValue('offerName', val.toLocaleLowerCase());
      },
      set: function trimValue(val) {
        this.setDataValue('offerName', val.trim());
      },
    },
    dateActiveFrom: {
      allowNull: false,
      type: DataTypes.STRING,
      set: function trimValue(val) {
        this.setDataValue('dateActiveFrom', val.trim());
      },
    },
    dateActiveTo: {
      allowNull: true,
      type: DataTypes.STRING,
      set: function trimValue(val) {
        this.setDataValue('dateActiveTo', val.trim());
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      set: function setIsActive(val) {
        this.setDataValue('isActive', val.toLocaleLowerCase());
      },
      set: function trimValue(val) {
        this.setDataValue('isActive', val.trim());
      },
    }
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};