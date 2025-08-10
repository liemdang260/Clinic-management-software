import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return Position.initModel(sequelize, dataTypes);
};

class Position extends Model {
  static initModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return super.init(
      {
        positionId: {
          autoIncrement: true,
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: "POSITION_ID",
        },
        positionName: {
          type: dataTypes.STRING(30),
          allowNull: true,
          field: "POSITION_NAME",
        },
        specialty: {
          type: dataTypes.STRING(200),
          allowNull: true,
          field: "SPECIALTY",
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
  static associate(this: any, { Employee }: any) {
    this.hasMany(Employee, { as: "employees", foreignKey: "positionId" });
  }
}
