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
      customerCoordinates: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: true
      },
      customerLongitude: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      customerLatitude: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      customerAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      restaurantId: {
        type: Sequelize.UUID,
        references: {
          model: "restaurants",
          key: 'id'
        },
        allowNull: true
      },
      restaurantCoordinates: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: true
      },
      restaurantLongitude: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      restaurantLatitude: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      restaurantAddress: {
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