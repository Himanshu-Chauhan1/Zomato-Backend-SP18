'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deliveryPartners', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      dob: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bikeAvailable: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bloodGroup: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      joiningDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      languagesKnown: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false,
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        default: true
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
    await queryInterface.dropTable('deliveryPartners');
  }
};