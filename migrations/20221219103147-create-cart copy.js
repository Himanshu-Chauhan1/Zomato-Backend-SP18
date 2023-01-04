'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      customerId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "customers",
          key: 'id'
        },
        allowNull: false
      },
      restaurantId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "restaurants",
          key: 'id'
        },
        allowNull: false
      },
      itemId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "fooditems",
          key: 'id'
        },
        allowNull: false
      },
      itemQuantity: {
        type: Sequelize.DECIMAL,
      },
      itemPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      totalPrice: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      totalItems: {
        type: Sequelize.STRING,
        allownull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allownull: true,
        defaultValue: true
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
    await queryInterface.dropTable('carts');
  }
};