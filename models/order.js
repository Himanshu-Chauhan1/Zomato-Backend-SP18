'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
      this.belongsTo(models.offer, {
        as: "offer",
        foreignKey: "offerId"
      })
      this.belongsTo(models.address, {
        as: "address",
        foreignKey: "deliveryAddressId"
      })
    }
  }
  order.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
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
    offerId: {
      type: DataTypes.UUID,
      references: {
        model: "offer",
        key: 'id'
      },
      allowNull: true
    },
    cartItems: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    placedTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    finalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    deliveryAddressId: {
      type: DataTypes.UUID,
      references: {
        model: "address",
        key: 'id'
      },
      allowNull: false
    },
    orderStatus: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['accepted', 'rejected', 'preparing', 'prepared', 'takenOver', 'handedOver', 'onTheWay', 'delivered', 'placed', 'onTheLocation', 'reachedTheLocation', 'cancelled'],
      set: function setOrderStatus(val) {
        this.setDataValue('orderStatus', val.toLocaleLowerCase().trim());
      },
    },
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};