import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return Employee.initModel(sequelize, dataTypes);
};

class Employee extends Model {
  static initModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return super.init(
      {
        employeeId: {
          autoIncrement: true,
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: "EMPLOYEE_ID",
        },
        employeeName: {
          type: dataTypes.STRING(30),
          allowNull: true,
          field: "EMPLOYEE_NAME",
        },
        identityNumber: {
          type: dataTypes.STRING(11),
          allowNull: true,
          field: "IDENTITY_NUMBER",
        },
        phone: { type: dataTypes.STRING(11), allowNull: true, field: "PHONE" },
        gender: { type: dataTypes.BOOLEAN, allowNull: true, field: "GENDER" },
        dateOfBirth: {
          type: dataTypes.DATEONLY,
          allowNull: true,
          field: "DATE_OF_BIRTH",
        },
        employeeAddress: {
          type: dataTypes.STRING(50),
          allowNull: true,
          field: "EMPLOYEE_ADDRESS",
        },
        positionId: {
          type: dataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "POSITION",
            key: "POSITION_ID",
          },
          field: "POSITION",
        },
        startWorkDate: {
          type: dataTypes.DATEONLY,
          allowNull: true,
          field: "START_WORK_DATE",
        },
        salary: { type: dataTypes.INTEGER, allowNull: true, field: "SALARY" },
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
    { Account, Position, Appointment }: any,
  ) {
    this.belongsTo(Position, {
      as: "position",
      foreignKey: "positionId",
    });
    this.hasOne(Account, { as: "account", foreignKey: "employeeId" });
    this.hasMany(Appointment, {
      as: "appointments",
      foreignKey: "doctorId",
    });
  }
}
