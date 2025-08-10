import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return EMPLOYEE.initModel(sequelize, dataTypes);
};

class EMPLOYEE extends Model {
  static initModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return super.init(
      {
        EMPLOYEE_ID: {
          autoIncrement: true,
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        EMPLOYEE_NAME: {
          type: dataTypes.STRING(30),
          allowNull: true,
        },
        IDENTITY_NUMBER: {
          type: dataTypes.STRING(11),
          allowNull: true,
        },
        PHONE: {
          type: dataTypes.STRING(11),
          allowNull: true,
        },
        GENDER: {
          type: dataTypes.BOOLEAN,
          allowNull: true,
        },
        DATE_OF_BIRTH: {
          type: dataTypes.DATEONLY,
          allowNull: true,
        },
        EMPLOYEE_ADDRESS: {
          type: dataTypes.STRING(50),
          allowNull: true,
        },
        POSITION: {
          type: dataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "POSITION",
            key: "POSITION_ID",
          },
        },
        START_WORK_DATE: {
          type: dataTypes.DATEONLY,
          allowNull: true,
        },
        SALARY: {
          type: dataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "EMPLOYEE",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "EMPLOYEE_ID" }],
          },
          {
            name: "FK_EMPLOYEE_POSITION_EMPLOYEE_ID",
            using: "BTREE",
            fields: [{ name: "POSITION" }],
          },
        ],
      },
    );
  }

  static associate(
    this: any,
    { ACCOUNT, POSITION, APPOINTMENT }: any,
  ) {
    this.belongsTo(POSITION, {
      as: "POSITIONS",
      foreignKey: "POSITION",
    });
    this.hasOne(ACCOUNT, { as: "ACCOUNT", foreignKey: "EMPLOYEE_ID" });
    this.hasMany(APPOINTMENT, {
      as: "appointments",
      foreignKey: "DOCTOR_ID",
    });
  }
}
