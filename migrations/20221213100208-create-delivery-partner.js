'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deliveryPartners', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob: {
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
      userRole: {
        type: Sequelize.STRING,
        defaultValue: "deliverypartner"
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