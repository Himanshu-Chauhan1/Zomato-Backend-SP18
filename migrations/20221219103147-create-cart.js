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
        allowNull: false
      },
      itemId: {
        type: Sequelize.UUID,
        allowNull:false
      },
      itemQuantity: {
        type: Sequelize.INTEGER,
        allowNull:true
      },
      totalPrice: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      totalItems: {
        type: Sequelize.INTEGER,
        allownull: true
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