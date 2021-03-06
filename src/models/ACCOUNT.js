const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ACCOUNT.init(sequelize, DataTypes);
}

class ACCOUNT extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      EMPLOYEE_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      USERNAME: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      PASSWORD: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      ISACTIVE: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      ROLE: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'ACCOUNT',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: "PK__ACCOUNT__CBA14F4835C32BC1",
          unique: true,
          fields: [
            { name: "EMPLOYEE_ID" },
          ]
        },
      ]
    });
    return ACCOUNT;
  }
  static associate({ EMPLOYEE }) {
    this.belongsTo(EMPLOYEE, { foreignKey: 'EMPLOYEE_ID' })
  }
}
