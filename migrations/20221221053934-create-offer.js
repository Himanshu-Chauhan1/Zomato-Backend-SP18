'use strict';
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('offers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      restaurantId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: "restaurants",
          key: 'id'
        },
        allowNull: false
      },
      categoryName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      offerName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      discount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      dateActiveFrom: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dateActiveTo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: true
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
    await queryInterface.dropTable('offers');
  }
};