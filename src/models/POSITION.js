import Sequelize from "sequelize";
export default (sequelize, DataTypes) => {
  return POSITION.init(sequelize, DataTypes);
};

class POSITION extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        POSITION_ID: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        POSITION_NAME: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        SPECIALTY: {
          type: DataTypes.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "POSITION",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "POSITION_ID" }],
          },
        ],
      },
    );
  }
  static associate({ EMPLOYEE }) {
    this.hasMany(EMPLOYEE, { as: "EMPLOYEES", foreignKey: "POSITION" });
  }
}
