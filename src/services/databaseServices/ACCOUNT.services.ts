import { ACCOUNT } from "../../models/index.js";

class AccountServices {
  static _instance;

  static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  async findAccoutByUsername(username = "", option = {}) {
    try {
      const accounts = await ACCOUNT.findAll({
        where: {
          USERNAME: username,
        },
        ...option,
      });
      if (!accounts || accounts.length == 0) {
        return null;
      }
      return accounts[0];
    } catch (error) {
      throw Error;
    }
  }
}

export { AccountServices };
