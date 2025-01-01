import Sequelize from "sequelize";
export default (sequelize, DataTypes) => {
  return EMPLOYEE.init(sequelize, DataTypes);
};

class EMPLOYEE extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        EMPLOYEE_ID: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        EMPLOYEE_NAME: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        IDENTITY_NUMBER: {
          type: DataTypes.STRING(11),
          allowNull: true,
        },
        PHONE: {
          type: DataTypes.STRING(11),
          allowNull: true,
        },
        GENDER: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        DATE_OF_BIRTH: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        EMPLOYEE_ADDRESS: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        POSITION: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "POSITION",
            key: "POSITION_ID",
          },
        },
        START_WORK_DATE: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        SALARY: {
          type: DataTypes.INTEGER,
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

  static associate({ ACCOUNT, POSITION, APPOINTMENT }) {
    EMPLOYEE.belongsTo(POSITION, {
      as: "POSITIONS",
      foreignKey: "POSITION",
    });
    EMPLOYEE.hasOne(ACCOUNT, { as: "ACCOUNT", foreignKey: "EMPLOYEE_ID" });
    EMPLOYEE.hasMany(APPOINTMENT, {
      as: "appointments",
      foreignKey: "DOCTOR_ID",
    });
  }
}
