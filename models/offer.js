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
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    offerName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateActiveFrom: {
      allowNull: false,
      type: DataTypes.STRING
    },
    dateActiveTo: {
      allowNull: true,
      type: DataTypes.STRING
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};