'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      customerId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      restaurantId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      itemId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      itemQuantity: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Carts');
  }
};