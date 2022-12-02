import Sequelize from "sequelize";
export default (sequelize, DataTypes) => {
  return APPOINTMENT.init(sequelize, DataTypes);
};

class APPOINTMENT extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        APPOINTMENT_ID: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        CREATE_AT: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        TIME: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        PATIENT_ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "PATIENT",
            key: "PATIENT_ID",
          },
        },
        TYPE_ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "TYPE_OF_EXAMINATION",
            key: "TYPE_ID",
          },
        },
        STATUS_ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "APPOINTMENT_STATUS",
            key: "STATUS_ID",
          },
        },
        DOCTOR_ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "EMPLOYEE",
            key: "EMPLOYEE_ID",
          },
        },
      },
      {
        sequelize,
        tableName: "APPOINTMENT",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "APPOINTMENT_ID" }],
          },
          {
            name: "FK_APPOINTMENT_TYPE_OF_EXAMINATION_TYPE_ID",
            using: "BTREE",
            fields: [{ name: "TYPE_ID" }],
          },
          {
            name: "FK_APPOINTMENT_APPOINTMENT_STATUS_STATUS_ID",
            using: "BTREE",
            fields: [{ name: "STATUS_ID" }],
          },
          {
            name: "FK_APPOINTMENT_PATIENT_PATIENT_ID",
            using: "BTREE",
            fields: [{ name: "PATIENT_ID" }],
          },
          {
            name: "FK_APPOINTMENT_EMPLOYEE_DOCTOR_ID",
            using: "BTREE",
            fields: [{ name: "DOCTOR_ID" }],
          },
        ],
      },
    );
  }

  static associate({
    EMPLOYEE,
    APPOINTMENT_STATUS,
    PATIENT,
    TYPE_OF_EXAMINATION,
  }) {
    APPOINTMENT.belongsTo(APPOINTMENT_STATUS, {
      as: "STATUS",
      foreignKey: "STATUS_ID",
    });
    APPOINTMENT.belongsTo(EMPLOYEE, { as: "DOCTOR", foreignKey: "DOCTOR_ID" });
    APPOINTMENT.belongsTo(PATIENT, { as: "PATIENT", foreignKey: "PATIENT_ID" });
    APPOINTMENT.belongsTo(TYPE_OF_EXAMINATION, {
      as: "TYPE",
      foreignKey: "TYPE_ID",
    });
  }
}
