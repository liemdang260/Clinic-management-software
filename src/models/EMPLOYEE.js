const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return EMPLOYEE.init(sequelize, DataTypes);
}

class EMPLOYEE extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      EMPLOYEE_ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      EMPLOYEE_NAME: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      IDENTITY_NUMBER: {
        type: DataTypes.STRING(15),
        allowNull: true
      },
      PHONE: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      GENDER: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      DATE_OF_BIRTH: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      EMPLOYEE_ADDRESS: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      POSITION: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'POSITION',
          key: 'POSITION_ID'
        }
      },
      START_WORK_DATE: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      SALARY: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'EMPLOYEE',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: "PK__EMPLOYEE__CBA14F4896C5029D",
          unique: true,
          fields: [
            { name: "EMPLOYEE_ID" },
          ]
        },
      ]
    });
    return EMPLOYEE;
  }
  static associate({ POSITION, ACCOUNT, APPOINTMENT, DIAGNOSTIC }) {
    this.belongsTo(POSITION, { foreignKey: "POSITION", as: 'position' })
    this.hasMany(ACCOUNT, { foreignKey: "EMPLOYEE_ID" })
    this.hasMany(APPOINTMENT, { as: "APPOINTMENTs", foreignKey: "DOCTOR_ID" });
    this.hasMany(DIAGNOSTIC, { as: "DIAGNOSTICs", foreignKey: "DOCTOR_ID" });
  }
}
