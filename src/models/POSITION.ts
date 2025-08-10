import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return POSITION.initModel(sequelize, dataTypes);
};

class POSITION extends Model {
  static initModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return super.init(
      {
        POSITION_ID: {
          autoIncrement: true,
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        POSITION_NAME: {
          type: dataTypes.STRING(30),
          allowNull: true,
        },
        SPECIALTY: {
          type: dataTypes.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "POSITION",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "POSITION_ID" }],
          },
        ],
      },
    );
  }
  static associate(this: any, { EMPLOYEE }: any) {
    this.hasMany(EMPLOYEE, { as: "EMPLOYEES", foreignKey: "POSITION" });
  }
}
