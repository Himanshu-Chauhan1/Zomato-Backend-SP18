'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('restaurants', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      landline: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ownerFullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ownerFullName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ownerEmail: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coordinates: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: true
      },
      longitude: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      latitude: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      radiusInKM: {
        type: Sequelize.DECIMAL,
        allowNull: true,
        defaultValue: 5
      },
      restaurantAddress: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userRole: {
        type: Sequelize.STRING,
        defaultValue: "restaurant"
      },
      resetLink: {
        type: Sequelize.STRING,
        allowNull:true
      },
      otp: {
        type: Sequelize.STRING,
        allowNull:true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
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
    await queryInterface.dropTable('restaurants');
  }
};