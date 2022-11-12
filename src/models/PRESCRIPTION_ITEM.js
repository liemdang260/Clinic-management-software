import Sequelize from "sequelize";
export default (sequelize, DataTypes) => {
  return PRESCRIPTION_ITEM.init(sequelize, DataTypes);
};

class PRESCRIPTION_ITEM extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        ITEM_ID: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        PRESCRIPTION_ID: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "PRESCRIPTION",
            key: "PRESCRIPTION_ID",
          },
        },
        DRUG_NAME: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        NUMBER: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        INSTRUCTION: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "PRESCRIPTION_ITEM",
        schema: "dbo",
        timestamps: false,
        indexes: [
          {
            name: "PK__PRESCRIP__ADFD89A00A8A9D0A",
            unique: true,
            fields: [{ name: "ITEM_ID" }],
          },
        ],
      }
    );
    return PRESCRIPTION_ITEM;
  }
  static associate({ PRESCRIPTION }) {
    this.belongsTo(PRESCRIPTION, {
      as: "PRESCRIPTION",
      foreignKey: "PRESCRIPTION_ID",
    });
  }
}
