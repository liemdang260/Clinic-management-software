import Sequelize from "sequelize";
export default (sequelize, DataTypes) => {
  return PATIENT.init(sequelize, DataTypes);
};

class PATIENT extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        PATIENT_ID: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        PATIENT_NAME: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        IDENTITY_NUMBER: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        PHONE: {
          type: DataTypes.STRING(11),
          allowNull: true,
        },
        GENDER: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        DATE_OF_BIRTH: {
          type: DataTypes.DATEONLY,
          allowNull: true,
        },
        ADDRESS: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        OCCUPATION: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
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

  static associate({ APPOINTMENT }) {
    PATIENT.hasMany(APPOINTMENT, {
      as: "appointments",
      foreignKey: "PATIENT_ID",
    });
  }
}
