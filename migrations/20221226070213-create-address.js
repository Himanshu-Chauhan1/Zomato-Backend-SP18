'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: {
            tableName: 'customers',
            tableName: 'restaurants',
            tableName: 'Admins',
            tableName: 'customerSupports',
            tableName: 'deliveryPartners',
          },
          key: 'id'
        },
        allowNull: false
      },
      userRole: {
        type: Sequelize.ENUM,
        values: ['customer', 'deliverypartner', 'customersupport', 'restaurant', 'admin', 'superadmin']
      },
      streetName: {
        type: Sequelize.STRING,
        allowNull: true,
        lowerCase: true
      },
      cityName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      stateName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pincode: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('Addresses');
  }
};