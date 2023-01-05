'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      customerId: {
        type: Sequelize.UUID,
        references: {
          model: "customers",
          key: 'id'
        },
        allowNull: false
      },
      restaurantId: {
        type: Sequelize.UUID,
        references: {
          model: "restaurants",
          key: 'id'
        },
        allowNull: false
      },
      offerId: {
        type: Sequelize.UUID,
        references: {
          model: "offers",
          key: 'id'
        },
        allowNull: true
      },
      cartItems: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      placedTime: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      discount: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      finalPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      deliveryAddressId: {
        type: Sequelize.UUID,
        references: {
          model: "addresses",
          key: 'id'
        },
        allowNull: false
      },
      orderStatus: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['accepted', 'rejected', 'preparing', 'prepared', 'takenOver', 'handedOver', 'onTheWay', 'delivered', 'placed', 'onTheLocation', 'reachedTheLocation', 'cancelled']
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};