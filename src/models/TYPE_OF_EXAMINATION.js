const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return TYPE_OF_EXAMINATION.init(sequelize, DataTypes);
};

class TYPE_OF_EXAMINATION extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        TYPE_ID: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        TYPE_NAME: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "TYPE_OF_EXAMINATION",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "TYPE_ID" }],
          },
        ],
      },
    );
  }

  static associate({ APPOINTMENT }) {
    TYPE_OF_EXAMINATION.hasMany(APPOINTMENT, {
      as: "appointments",
      foreignKey: "TYPE_ID",
    });
  }
}
