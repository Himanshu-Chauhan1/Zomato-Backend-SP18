'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
       id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      fullName: {
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
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        trim:true
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
    await queryInterface.dropTable('Admins');
  }
};