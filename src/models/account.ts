import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return Account.initModel(sequelize, dataTypes);
};

class Account extends Model {
  static initModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return super.init(
      {
        employeeId: {
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "EMPLOYEE",
            key: "EMLOYEE_ID",
          },
          field: "EMPLOYEE_ID",
        },
        username: { type: dataTypes.STRING(30), allowNull: false, field: "USERNAME" },
        password: { type: dataTypes.STRING(50), allowNull: false, field: "PASSWORD" },
        isActive: { type: dataTypes.BOOLEAN, allowNull: false, field: "ISACTIVE" },
        role: { type: dataTypes.TINYINT, allowNull: false, field: "ROLE" },
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

  static associate(this: any, { Employee }: any) {
    this.belongsTo(Employee, { as: "employee", foreignKey: "employeeId" });
  }
}
