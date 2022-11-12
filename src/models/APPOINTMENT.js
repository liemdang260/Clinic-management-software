import Sequelize from "sequelize";
export default (sequelize, DataTypes) => {
  return APPOINTMENT.init(sequelize, DataTypes);
};

class APPOINTMENT extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        APPOINTMENT_ID: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        DOCTOR_ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "EMPLOYEE",
            key: "EMPLOYEE_ID",
          },
        },
        TIMES: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        PATIENT_ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "PATIENT",
            key: "PATIENT_ID",
          },
        },
        TYPE: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        STATUS: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "APPOINTMENT",
        schema: "dbo",
        timestamps: false,
        indexes: [
          {
            name: "PK__APPOINTM__49B308C698FE866B",
            unique: true,
            fields: [{ name: "APPOINTMENT_ID" }],
          },
        ],
      }
    );
    return APPOINTMENT;
  }
  static associate({ EMPLOYEE, PATIENT, DIAGNOSTIC }) {
    this.belongsTo(EMPLOYEE, { as: "DOCTOR", foreignKey: "DOCTOR_ID" });
    this.belongsTo(PATIENT, { as: "PATIENT", foreignKey: "PATIENT_ID" });
    this.hasMany(DIAGNOSTIC, {
      as: "DIAGNOSTICs",
      foreignKey: "RE_EXAMINATION",
    });
  }
}
