const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('SERVICE', {
    SERVICE_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SERVICE_NAME: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    FEE: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'SERVICE',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__SERVICE__30358F5A71F43215",
        unique: true,
        fields: [
          { name: "SERVICE_ID" },
        ]
      },
    ]
  });
};
