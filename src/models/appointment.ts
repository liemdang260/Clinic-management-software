import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return Appointment.initModel(sequelize, dataTypes);
};

class Appointment extends Model {
  static initModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return super.init(
      {
        appointmentId: {
          autoIncrement: true,
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: "APPOINTMENT_ID",
        },
        createAt: { type: dataTypes.DATE, allowNull: false, field: "CREATE_AT" },
        time: { type: dataTypes.DATE, allowNull: false, field: "TIME" },
        patientId: {
          type: dataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "PATIENT",
            key: "PATIENT_ID",
          },
          field: "PATIENT_ID",
        },
        typeId: {
          type: dataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "TYPE_OF_EXAMINATION",
            key: "TYPE_ID",
          },
          field: "TYPE_ID",
        },
        statusId: {
          type: dataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "APPOINTMENT_STATUS",
            key: "STATUS_ID",
          },
          field: "STATUS_ID",
        },
        doctorId: {
          type: dataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "EMPLOYEE",
            key: "EMPLOYEE_ID",
          },
          field: "DOCTOR_ID",
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

  static associate(
    this: any,
    { Employee, AppointmentStatus, Patient, TypeOfExamination }: any,
  ) {
    this.belongsTo(AppointmentStatus, {
      as: "status",
      foreignKey: "statusId",
    });
    this.belongsTo(Employee, { as: "doctor", foreignKey: "doctorId" });
    this.belongsTo(Patient, { as: "patient", foreignKey: "patientId" });
    this.belongsTo(TypeOfExamination, {
      as: "type",
      foreignKey: "typeId",
    });
  }
}
