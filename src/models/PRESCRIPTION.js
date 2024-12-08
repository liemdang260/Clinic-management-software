import { Model, DataTypes } from "sequelize";
import connection from "../connectDB/db.js";

export class PRESCRIPTION extends Model {
  static associate({ PRESCRIPTION_ITEM, DIAGNOSTIC }) {
    this.hasMany(PRESCRIPTION_ITEM, {
      as: "PRESCRIPTION_ITEMs",
      foreignKey: "PRESCRIPTION_ID",
    });
    this.hasMany(DIAGNOSTIC, { as: "DIAGNOSTICs", foreignKey: "PRESCRIPTION" });
  }
}

PRESCRIPTION.init(
  {
    PRESCRIPTION_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    DOCTOR_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CREATE_AT: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: connection.instance.getClient(),
    tableName: "PRESCRIPTION",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__PRESCRIP__83756B5F7BF46525",
        unique: true,
        fields: [{ name: "PRESCRIPTION_ID" }],
      },
    ],
  }
);
