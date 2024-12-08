import { Model, DataTypes } from "sequelize";
import connection from "../connectDB/db.js";

export class APPOINTMENTREQUEST extends Model {}

APPOINTMENTREQUEST.init(
  {
    REQUEST_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    CREATE_AT: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    PATIENT_NAME: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    IDENTITY_NUMBER: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    PHONE: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    GENDER: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    DATE_OF_BIRTH: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    ADDRESS: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    DOCTOR_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    TIMES: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    STATUS: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: connection.instance.getClient(),
    tableName: "APPOINTMENTREQUEST",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__APPOINTM__71D2766C649828FB",
        unique: true,
        fields: [{ name: "REQUEST_ID" }],
      },
    ],
  }
);
