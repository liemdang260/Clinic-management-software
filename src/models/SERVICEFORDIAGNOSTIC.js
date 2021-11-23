const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return SERVICEFORDIAGNOSTIC.init(sequelize, DataTypes);
}

class SERVICEFORDIAGNOSTIC extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    DIAGNOSTIC_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'DIAGNOSTIC',
        key: 'DIAGNOSTIC_ID'
      }
    },
    SERVICE_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'SERVICE',
        key: 'SERVICE_ID'
      }
    }
  }, {
    sequelize,
    tableName: 'SERVICEFORDIAGNOSTIC',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__SERVICEF__88F5DC8BE946DEED",
        unique: true,
        fields: [
          { name: "DIAGNOSTIC_ID" },
          { name: "SERVICE_ID" },
        ]
      },
    ]
  });
  return SERVICEFORDIAGNOSTIC;
  }
  static associate({ SERVICE, DIAGNOSTIC }) {
    this.belongsTo(DIAGNOSTIC, { as: "DIAGNOSTIC", foreignKey: "DIAGNOSTIC_ID"});
    this.belongsTo(SERVICE, { as: "SERVICE", foreignKey: "SERVICE_ID"});
  }
}
