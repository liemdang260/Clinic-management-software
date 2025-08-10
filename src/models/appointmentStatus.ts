import { Model, Sequelize, DataTypes } from "sequelize";
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return AppointmentStatus.initModel(sequelize, dataTypes);
};

class AppointmentStatus extends Model {
  static initModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    return super.init(
      {
        statusId: {
          autoIncrement: true,
          type: dataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          field: "STATUS_ID",
        },
        statusName: {
          type: dataTypes.STRING(30),
          allowNull: false,
          field: "STATUS_NAME",
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

  static associate(this: any, { Appointment }: any) {
    this.hasMany(Appointment, {
      as: "appointments",
      foreignKey: "statusId",
    });
  }
}
