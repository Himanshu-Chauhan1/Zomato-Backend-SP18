'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('queries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      orderId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      queryDescription: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userRole: {
        type:   Sequelize.ENUM,
        values: ['customer', 'deliverypartner', 'customersupport', 'restaurant','admin','superadmin']
      },
      isRequest: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('queries');
  }
};