import { Model, DataTypes } from "sequelize";
import connection from "../connectDB/db.js";

export class DIAGNOSTIC extends Model {
  static associate({
    APPOINTMENT,
    EMPLOYEE,
    PATIENT,
    PRESCRIPTION,
    SERVICE,
    SERVICEFORDIAGNOSTIC,
  }) {
    this.belongsTo(APPOINTMENT, {
      as: "RE_EXAMINATION_APPOINTMENT",
      foreignKey: "RE_EXAMINATION",
    });
    this.belongsTo(EMPLOYEE, { as: "DOCTOR", foreignKey: "DOCTOR_ID" });
    this.belongsTo(PATIENT, { as: "PATIENT", foreignKey: "PATIENT_ID" });
    this.belongsTo(PRESCRIPTION, {
      as: "PRESCRIPTION_PRESCRIPTION",
      foreignKey: "PRESCRIPTION",
    });
    this.belongsToMany(SERVICE, {
      as: "SERVICE_ID_SERVICEs",
      through: SERVICEFORDIAGNOSTIC,
      foreignKey: "DIAGNOSTIC_ID",
      otherKey: "SERVICE_ID",
    });
    this.hasMany(SERVICEFORDIAGNOSTIC, {
      as: "SERVICEFORDIAGNOSTICs",
      foreignKey: "DIAGNOSTIC_ID",
    });
  }
}

DIAGNOSTIC.init(
  {
    DIAGNOSTIC_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    CREATE_AT: {
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
    DOCTOR_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "EMPLOYEE",
        key: "EMPLOYEE_ID",
      },
    },
    SYMPTOM: {
      type: DataTypes.STRING(1),
      allowNull: true,
    },
    PRESCRIPTION: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "PRESCRIPTION",
        key: "PRESCRIPTION_ID",
      },
    },
    DIAGNOSTIC_FEE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    RE_EXAMINATION: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "APPOINTMENT",
        key: "APPOINTMENT_ID",
      },
    },
    NOTE: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    RECEPTION: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    STATUS: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize: connection.instance.getClient(),
    tableName: "DIAGNOSTIC",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__DIAGNOST__3BF6847E70D4210E",
        unique: true,
        fields: [{ name: "DIAGNOSTIC_ID" }],
      },
    ],
  }
);
