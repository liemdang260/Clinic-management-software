import { ACCOUNT } from "../../models/index.js";

export const findAccoutByUsername = async (username = "", option = {}) => {
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
};
