'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class location extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.restaurant, {
        as: "restaurant",
        foreignKey: "restaurantId"
      })
    }
  }
  location.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    customerCoordinates: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true
    },
    customerLongitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    customerLatitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    customerAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    restaurantId: {
      type: DataTypes.UUID,
      references: {
        model: "restaurant",
        key: 'id'
      },
      allowNull: true
    },
    restaurantCoordinates: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true
    },
    restaurantLongitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    restaurantLatitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    restaurantAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'location',
  });
  return location;
};