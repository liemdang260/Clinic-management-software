import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return PATIENT.initModel(sequelize, dataTypes);
};

class PATIENT extends Model {
  static initModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return super.init(
      {
        PATIENT_ID: {
          autoIncrement: true,
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        PATIENT_NAME: { type: dataTypes.STRING(50), allowNull: true },
        IDENTITY_NUMBER: { type: dataTypes.STRING(20), allowNull: false },
        PHONE: { type: dataTypes.STRING(11), allowNull: true },
        GENDER: { type: dataTypes.BOOLEAN, allowNull: true },
        DATE_OF_BIRTH: { type: dataTypes.DATEONLY, allowNull: true },
        ADDRESS: { type: dataTypes.STRING(100), allowNull: true },
        OCCUPATION: { type: dataTypes.STRING(30), allowNull: true },
      },
      {
        sequelize,
        tableName: "PATIENT",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "PATIENT_ID" }],
          },
        ],
      },
    );
  }

  static associate(this: any, { APPOINTMENT }: any) {
    this.hasMany(APPOINTMENT, {
      as: "appointments",
      foreignKey: "PATIENT_ID",
    });
  }
}
