'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Issues', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      issue: {
        type: Sequelize.STRING,
        allowNull: true,
        set: function trimValue(val) {
          this.setDataValue('issue', val.trim());
        },
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: true,
        set: function setFullName(val) {
          this.setDataValue('queryDescription', val.toLocaleLowerCase().trim());
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        set: function setEmail(val) {
          this.setDataValue('email', val.toLocaleLowerCase().trim());
        },
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        set: function trimValue(val) {
          this.setDataValue('phone', val.trim());
        },
      },
      issueDescription: {
        type: Sequelize.STRING,
        allowNull: true,
        set: function setIssueDescription(val) {
          this.setDataValue('issueDescription', val.toLocaleLowerCase().trim());
        },
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
    await queryInterface.dropTable('Issues');
  }
};