const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return POSITION.init(sequelize, DataTypes);
}

class POSITION extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  super.init({
    POSITION_ID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    POSITION_NAME: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    SPECIALTY: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'POSITION',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__POSITION__C703B80476602EE5",
        unique: true,
        fields: [
          { name: "POSITION_ID" },
        ]
      },
    ]
  });
  return POSITION;
  }
  static associate({EMPLOYEE}){
    this.belongsTo(EMPLOYEE, {foreignKey:'POSITION_ID'})
  }
}
