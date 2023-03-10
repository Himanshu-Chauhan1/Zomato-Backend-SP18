'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      restaurantId: {
        type: Sequelize.UUID,
        references: {
          model: "restaurants",
          key: 'id'
        },
        allowNull: true
      },
      coordinates: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false
      },
      longitude: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      latitude: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
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
    await queryInterface.dropTable('locations');
  }
};