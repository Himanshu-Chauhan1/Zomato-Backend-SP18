'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customerSupports', {
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
      bloodGroup: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      joiningDate: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      departmentName: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('customerSupports');
  }
};