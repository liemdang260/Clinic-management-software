const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return APPOINTMENTREQUEST.init(sequelize, DataTypes);
}

class APPOINTMENTREQUEST extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    REQUEST_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CREATE_AT: {
      type: DataTypes.DATE,
      allowNull: true
    },
    PATIENT_NAME: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    IDENTITY_NUMBER: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    PHONE: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    GENDER: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    DATE_OF_BIRTH: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ADDRESS: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    DOCTOR_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TIMES: {
      type: DataTypes.DATE,
      allowNull: true
    },
    STATUS: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue:0
    }
  }, {
    sequelize,
    tableName: 'APPOINTMENTREQUEST',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__APPOINTM__71D2766C649828FB",
        unique: true,
        fields: [
          { name: "REQUEST_ID" },
        ]
      },
    ]
  });
  return APPOINTMENTREQUEST;
  }
}
