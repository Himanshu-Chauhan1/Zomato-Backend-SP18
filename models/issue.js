'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Issue.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    issue: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function trimValue(val) {
        this.setDataValue('issue', val.trim());
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function setFullName(val) {
        this.setDataValue('fullName', val.toLocaleLowerCase().trim());
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function setEmail(val) {
        this.setDataValue('email', val.toLocaleLowerCase().trim());
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function trimValue(val) {
        this.setDataValue('phone', val.trim());
      },
    },
    issueDescription: {
      type: DataTypes.STRING,
      allowNull: true,
      set: function setIssueDescription(val) {
        this.setDataValue('issueDescription', val.toLocaleLowerCase().trim());
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Issue',
  });
  return Issue;
};