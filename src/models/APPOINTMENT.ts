import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return APPOINTMENT.initModel(sequelize, dataTypes);
};

class APPOINTMENT extends Model {
  static initModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return super.init(
      {
        APPOINTMENT_ID: {
          autoIncrement: true,
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        CREATE_AT: {
          type: dataTypes.DATE,
          allowNull: false,
        },
        TIME: {
          type: dataTypes.DATE,
          allowNull: false,
        },
        PATIENT_ID: {
          type: dataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "PATIENT",
            key: "PATIENT_ID",
          },
        },
        TYPE_ID: {
          type: dataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "TYPE_OF_EXAMINATION",
            key: "TYPE_ID",
          },
        },
        STATUS_ID: {
          type: dataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "APPOINTMENT_STATUS",
            key: "STATUS_ID",
          },
        },
        DOCTOR_ID: {
          type: dataTypes.INTEGER,
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

  static associate(
    this: any,
    { EMPLOYEE, APPOINTMENT_STATUS, PATIENT, TYPE_OF_EXAMINATION }: any,
  ) {
    this.belongsTo(APPOINTMENT_STATUS, {
      as: "STATUS",
      foreignKey: "STATUS_ID",
    });
    this.belongsTo(EMPLOYEE, { as: "DOCTOR", foreignKey: "DOCTOR_ID" });
    this.belongsTo(PATIENT, { as: "PATIENT", foreignKey: "PATIENT_ID" });
    this.belongsTo(TYPE_OF_EXAMINATION, {
      as: "TYPE",
      foreignKey: "TYPE_ID",
    });
  }
}
