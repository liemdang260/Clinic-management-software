const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ROOM.init(sequelize, DataTypes);
}

class ROOM extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init({
      ROOM_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      DOCTOR_ID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'EMPLOYEE',
          key: 'EMPLOYEE_ID'
        }
      }
    }, {
      sequelize,
      tableName: 'ROOM',
      schema: 'dbo',
      timestamps: false,
      indexes: [
        {
          name: "PK__ROOM__2F3DD482D7692CC3",
          unique: true,
          fields: [
            { name: "ROOM_ID" },
          ]
        },
      ]
    });
    return ROOM;
  }
  static associate({ EMPLOYEE }) {
    this.belongsTo(EMPLOYEE, { as: "DOCTOR", foreignKey: "DOCTOR_ID" });
  }
}
