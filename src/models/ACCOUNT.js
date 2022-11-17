import Sequelize from "sequelize";
export default (sequelize, DataTypes) => {
  return ACCOUNT.init(sequelize, DataTypes);
};

class ACCOUNT extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        EMPLOYEE_ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "EMPLOYEE",
            key: "EMLOYEE_ID",
          },
        },
        USERNAME: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        PASSWORD: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        ISACTIVE: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        ROLE: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
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
      }
    );
  }

  static associate({ EMPLOYEE }) {
    this.belongsTo(EMPLOYEE, { as: "EMPLOYEE", foreignKey: "EMPLOYEE_ID" });
  }
}
