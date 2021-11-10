const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return PRESCRIPTION.init(sequelize, DataTypes);
}

class PRESCRIPTION extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      PRESCRIPTION_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      DOCTOR_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      CREATE_AT: {
        type: DataTypes.DATE,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'PRESCRIPTION',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: "PK__PRESCRIP__83756B5F7BF46525",
          unique: true,
          fields: [
            { name: "PRESCRIPTION_ID" },
          ]
        },
      ]
    });
    return PRESCRIPTION;
  }
  static associate({ PRESCRIPTION_ITEM, DIAGNOSTIC }) {
    this.hasMany(PRESCRIPTION_ITEM, { as: "PRESCRIPTION_ITEMs", foreignKey: "PRESCRIPTION_ID" });
    this.hasMany(DIAGNOSTIC, { as: "DIAGNOSTICs", foreignKey: "PRESCRIPTION" });
  }
}
