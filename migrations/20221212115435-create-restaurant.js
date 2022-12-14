'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('restaurants', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        trim:true
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        trim:true
      },
      landline: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        trim:true
      },
      ownerFullName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        trim:true
      },
      ownerFullName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        trim:true
      },
      ownerEmail: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        trim:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:true
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