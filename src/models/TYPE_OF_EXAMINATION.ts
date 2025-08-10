import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return TYPE_OF_EXAMINATION.initModel(sequelize, dataTypes);
};

class TYPE_OF_EXAMINATION extends Model {
  static initModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes,
  ) {
    return super.init(
      {
        TYPE_ID: {
          autoIncrement: true,
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        TYPE_NAME: {
          type: dataTypes.STRING(30),
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

  static associate(this: any, { APPOINTMENT }: any) {
    this.hasMany(APPOINTMENT, {
      as: "appointments",
      foreignKey: "TYPE_ID",
    });
  }
}
