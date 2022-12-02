import Sequelize from "sequelize";
export default (sequelize, DataTypes) => {
  return APPOINTMENT_STATUS.init(sequelize, DataTypes);
};

class APPOINTMENT_STATUS extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        STATUS_ID: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        STATUS_NAME: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "APPOINTMENT_STATUS",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "STATUS_ID" }],
          },
        ],
      },
    );
  }

  static associate({ APPOINTMENT }) {
    APPOINTMENT_STATUS.hasMany(APPOINTMENT, {
      as: "appointments",
      foreignKey: "STATUS_ID",
    });
  }
}
