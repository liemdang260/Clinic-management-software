import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return APPOINTMENT_STATUS.initModel(sequelize, dataTypes);
};

class APPOINTMENT_STATUS extends Model {
  static initModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return super.init(
      {
        STATUS_ID: {
          autoIncrement: true,
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        STATUS_NAME: { type: dataTypes.STRING(30), allowNull: false },
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

  static associate(this: any, { APPOINTMENT }: any) {
    this.hasMany(APPOINTMENT, {
      as: "appointments",
      foreignKey: "STATUS_ID",
    });
  }
}
