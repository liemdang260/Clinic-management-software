import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return TypeOfExamination.initModel(sequelize, dataTypes);
};

class TypeOfExamination extends Model {
  static initModel(
    sequelize: Sequelize,
    dataTypes: typeof DataTypes,
  ) {
    return super.init(
      {
        typeId: {
          autoIncrement: true,
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: "TYPE_ID",
        },
        typeName: {
          type: dataTypes.STRING(30),
          allowNull: false,
          field: "TYPE_NAME",
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

  static associate(this: any, { Appointment }: any) {
    this.hasMany(Appointment, {
      as: "appointments",
      foreignKey: "typeId",
    });
  }
}
