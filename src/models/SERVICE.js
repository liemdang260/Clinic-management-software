const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return SERVICE.init(sequelize, DataTypes);
}

class SERVICE extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
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
  return SERVICE;
  }
  static associate({DIAGNOSTIC, SERVICEFORDIAGNOSTIC }) {
    this.belongsToMany(DIAGNOSTIC, { as: 'DIAGNOSTIC_ID_DIAGNOSTICs', through: SERVICEFORDIAGNOSTIC, foreignKey: "SERVICE_ID", otherKey: "DIAGNOSTIC_ID" });
    this.hasMany(SERVICEFORDIAGNOSTIC, { as: "SERVICEFORDIAGNOSTICs", foreignKey: "SERVICE_ID"});
  }
}
