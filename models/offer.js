'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {

    static associate(models) {
      // define association here
      this.belongsTo(models.restaurant, {
        as: "restaurant",
        foreignKey: "restaurantId"
      })
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
      references: {
        model: "restaurant",
        key: 'id'
      },
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function setCategoryName(val) {
        this.setDataValue('categoryName', val.trim());
      },
    },
    offerName: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function setOfferName(val) {
        this.setDataValue('offerName', val.trim());
      },
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
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
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'offer',
  });
  return Offer;
};