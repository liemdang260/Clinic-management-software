const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return DIAGNOSTIC.init(sequelize, DataTypes);
}

class DIAGNOSTIC extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      DIAGNOSTIC_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      CREATE_AT: {
        type: DataTypes.DATE,
        allowNull: true
      },
      PATIENT_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'PATIENT',
          key: 'PATIENT_ID'
        }
      },
      DOCTOR_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'EMPLOYEE',
          key: 'EMPLOYEE_ID'
        }
      },
      SYMPTOM: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      PRESCRIPTION: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'PRESCRIPTION',
          key: 'PRESCRIPTION_ID'
        }
      },
      DIAGNOSTIC_FEE: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      RE_EXAMINATION: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'APPOINTMENT',
          key: 'APPOINTMENT_ID'
        }
      },
      NOTE: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      RECEPTION: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      STATUS: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      BLOOD_PRESSURE: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      PULSE: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      DIAGNOSTIC: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      TEMPERATURE: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
    }, {
      sequelize,
      tableName: 'DIAGNOSTIC',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: "PK__DIAGNOST__3BF6847E70D4210E",
          unique: true,
          fields: [
            { name: "DIAGNOSTIC_ID" },
          ]
        },
      ]
    });
    return DIAGNOSTIC;
  }
  static associate({ APPOINTMENT, EMPLOYEE, PATIENT, PRESCRIPTION, SERVICE, SERVICEFORDIAGNOSTIC }) {
    this.belongsTo(APPOINTMENT, { as: "RE_EXAMINATION_APPOINTMENT", foreignKey: "RE_EXAMINATION" });
    this.belongsTo(EMPLOYEE, { as: "DOCTOR", foreignKey: "DOCTOR_ID" });
    this.belongsTo(PATIENT, { as: "PATIENT", foreignKey: "PATIENT_ID" });
    this.belongsTo(PRESCRIPTION, { as: "PRESCRIPTION_PRESCRIPTION", foreignKey: "PRESCRIPTION" });
    this.belongsToMany(SERVICE, { as: 'SERVICE_ID_SERVICEs', through: SERVICEFORDIAGNOSTIC, foreignKey: "DIAGNOSTIC_ID", otherKey: "SERVICE_ID" });
    this.hasMany(SERVICEFORDIAGNOSTIC, { as: "SERVICEFORDIAGNOSTICs", foreignKey: "DIAGNOSTIC_ID" });
  }
}
