import { Model, DataTypes } from "sequelize";
import connection from "../connectDB/db.js";

export class SERVICEFORDIAGNOSTIC extends Model {
  static associate({ SERVICE, DIAGNOSTIC }) {
    this.belongsTo(DIAGNOSTIC, {
      as: "DIAGNOSTIC",
      foreignKey: "DIAGNOSTIC_ID",
    });
    this.belongsTo(SERVICE, { as: "SERVICE", foreignKey: "SERVICE_ID" });
  }
}

SERVICEFORDIAGNOSTIC.init(
  {
    DIAGNOSTIC_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "DIAGNOSTIC",
        key: "DIAGNOSTIC_ID",
      },
    },
    SERVICE_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "SERVICE",
        key: "SERVICE_ID",
      },
    },
  },
  {
    sequelize: connection.instance.getClient(),
    tableName: "SERVICEFORDIAGNOSTIC",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__SERVICEF__88F5DC8BE946DEED",
        unique: true,
        fields: [{ name: "DIAGNOSTIC_ID" }, { name: "SERVICE_ID" }],
      },
    ],
  }
);
