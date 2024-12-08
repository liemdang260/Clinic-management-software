import { Model, DataTypes } from "sequelize";
import connection from "../connectDB/db.js";

class POSITION extends Model {
  static associate({ EMPLOYEE }) {
    this.belongsTo(EMPLOYEE, { foreignKey: "POSITION_ID" });
  }
}

POSITION.init(
  {
    POSITION_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    POSITION_NAME: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    SPECIALTY: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize: connection.instance.getClient(),
    tableName: "POSITION",
    schema: "dbo",
    timestamps: false,
    indexes: [
      {
        name: "PK__POSITION__C703B80476602EE5",
        unique: true,
        fields: [{ name: "POSITION_ID" }],
      },
    ],
  }
);
