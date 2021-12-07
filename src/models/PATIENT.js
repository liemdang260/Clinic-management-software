const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return PATIENT.init(sequelize, DataTypes);
}

class PATIENT extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      PATIENT_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      PATIENT_NAME: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      IDENTITY_NUMBER: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      PHONE: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      GENDER: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      DATE_OF_BIRTH: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      ADDRESS: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      OCCUPATION: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'PATIENT',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: "PK__PATIENT__AA0B60687E5AEFAE",
          unique: true,
          fields: [
            { name: "PATIENT_ID" },
          ]
        },
      ]
    });
    return PATIENT;
  }
  static associate({ DIAGNOSTIC, APPOINTMENT }) {
    this.hasMany(DIAGNOSTIC, { as: "DIAGNOSTICs", foreignKey: "PATIENT_ID" });
    this.hasMany(APPOINTMENT, { as: "APPOINTMENTs", foreignKey: "PATIENT_ID" });
  }
}
