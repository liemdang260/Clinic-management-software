var DataTypes = require("sequelize").DataTypes;
var _ACCOUNT = require("./ACCOUNT");

function initModels(sequelize) {
  var ACCOUNT = _ACCOUNT(sequelize, DataTypes);


  return {
    ACCOUNT,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
