import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const require = createRequire(import.meta.url);
const configFile = require("../config/config.json");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const db: any = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}
const modelName = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 &&
    file !== basename &&
    file != "init-models.js" &&
    file.slice(-3) === ".js"
  );
});
for (let i = 0; i < modelName.length; i++) {
  await import(
    pathToFileURL(path.join(__dirname, modelName[i])).toString()
  ).then((modelCreate) => {
    const model = modelCreate.default(sequelize, DataTypes);
    db[model.name] = model;
  });
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

const {
  ACCOUNT,
  EMPLOYEE,
  POSITION,
  APPOINTMENT_STATUS,
  APPOINTMENT,
  Patient,
  TYPE_OF_EXAMINATION,
} = db;

//TODO remove this line
export default db;

export {
  sequelize,
  Sequelize,
  ACCOUNT,
  EMPLOYEE,
  POSITION,
  APPOINTMENT_STATUS,
  APPOINTMENT,
  Patient,
  TYPE_OF_EXAMINATION,
};
