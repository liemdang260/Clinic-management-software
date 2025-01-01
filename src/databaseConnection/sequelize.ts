import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { getDirName } from "../utils";

dotenv.config();
class SequelizeConnection {
  private static _instance: SequelizeConnection;
  private client: Sequelize | null = null;

  static get instance() {
    if (!this._instance) {
      this._instance = new SequelizeConnection();
    }
    return this._instance;
  }

  async configure(conectionString: string) {
    console.log(getDirName(import.meta.url));

    this.client = new Sequelize(conectionString, {
      models: [getDirName(import.meta.url) + "/**/*.model.ts"],
    });

    await this.client.authenticate();
  }

  getClient() {
    return this.client;
  }
}

export default SequelizeConnection;
