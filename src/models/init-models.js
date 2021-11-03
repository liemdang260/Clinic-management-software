var DataTypes = require("sequelize").DataTypes;
var _SERVICE = require("./SERVICE");

function initModels(sequelize) {
  var SERVICE = _SERVICE(sequelize, DataTypes);


  return {
    SERVICE,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
