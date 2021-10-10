const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

class account extends Model {}

account.init({
  employee_id	: {
    type: DataTypes.STRING,
    allowNull: false
  },
  users: {
    type: DataTypes.STRING,
  },
  passwords: {
    type: DataTypes.STRING
  },
  isActive: {
    type: DataTypes.BOOLEAN
  },
  role: {
    type: DataTypes.INTEGER
  },
}, {
  sequelize,
  modelName: 'account'
});


console.log(account === sequelize.models.account); 
