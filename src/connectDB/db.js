import { Sequelize } from "sequelize";

import dotenv from "dotenv";
dotenv.config();
class SequelizeConnection {
  static _instance;
  client;

  static get instance() {
    if (!this._instance) {
      const client = new Sequelize(process.env.POSTGRESS_URL || "");
      this._instance = new SequelizeConnection();
      this._instance.client = client;
    }
    return this._instance;
  }

  getClient() {
    return this.client;
  }
}

export default SequelizeConnection;
