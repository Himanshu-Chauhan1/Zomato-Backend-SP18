'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carts', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      customerId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'customers',
          },
          key: 'id'
        },
        allowNull: false
      },
      restaurantId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'restaurants',
          },
          key: 'id'
        },
        allowNull: false
      },
      itemId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'foodItems',
          },
          key: 'id'
        },
        allowNull: false
      },
      itemQuantity: {
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      totalItems: {
        type: Sequelize.STRING,
        allownull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allownull: true,
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
    await queryInterface.dropTable('Carts');
  }
};