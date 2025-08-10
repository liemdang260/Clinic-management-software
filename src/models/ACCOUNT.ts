import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return ACCOUNT.initModel(sequelize, dataTypes);
};

class ACCOUNT extends Model {
  static initModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return super.init(
      {
        EMPLOYEE_ID: {
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "EMPLOYEE",
            key: "EMLOYEE_ID",
          },
        },
        USERNAME: { type: dataTypes.STRING(30), allowNull: false },
        PASSWORD: { type: dataTypes.STRING(50), allowNull: false },
        ISACTIVE: { type: dataTypes.BOOLEAN, allowNull: false },
        ROLE: { type: dataTypes.TINYINT, allowNull: false },
      },
      {
        sequelize,
        tableName: "ACCOUNT",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "EMPLOYEE_ID" }],
          },
        ],
      },
    );
  }

  static associate(this: any, { EMPLOYEE }: any) {
    this.belongsTo(EMPLOYEE, { as: "EMPLOYEE", foreignKey: "EMPLOYEE_ID" });
  }
}
