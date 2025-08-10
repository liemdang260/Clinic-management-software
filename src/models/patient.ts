import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return Patient.initModel(sequelize, dataTypes);
};

class Patient extends Model {
  static initModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return super.init(
      {
        patientId: {
          autoIncrement: true,
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: "PATIENT_ID",
        },
        patientName: {
          type: dataTypes.STRING(50),
          allowNull: true,
          field: "PATIENT_NAME",
        },
        identityNumber: {
          type: dataTypes.STRING(20),
          allowNull: false,
          field: "IDENTITY_NUMBER",
        },
        phone: { type: dataTypes.STRING(11), allowNull: true, field: "PHONE" },
        gender: { type: dataTypes.BOOLEAN, allowNull: true, field: "GENDER" },
        dateOfBirth: {
          type: dataTypes.DATEONLY,
          allowNull: true,
          field: "DATE_OF_BIRTH",
        },
        address: { type: dataTypes.STRING(100), allowNull: true, field: "ADDRESS" },
        occupation: {
          type: dataTypes.STRING(30),
          allowNull: true,
          field: "OCCUPATION",
        },
      },
      {
        sequelize,
        tableName: "PATIENT",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "PATIENT_ID" }],
          },
        ],
      },
    );
  }

  static associate(this: any, { Appointment }: any) {
    this.hasMany(Appointment, {
      as: "appointments",
      foreignKey: "patientId",
    });
  }
}
