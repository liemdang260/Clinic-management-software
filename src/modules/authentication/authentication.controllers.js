import {
  comparePassword,
  generateAccessToken,
} from "./authentication.methods.js";
import { findAccoutByUsername } from "../../services/databaseServices/index.js";
import CustomError, { ERROR_MESSAGE } from "../../services/customError.js";

const handleLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const account = await findAccoutByUsername(username, {
      include: ["EMPLOYEE"],
    });

    if (!account) {
      throw new CustomError({
        code: 404,
        ...ERROR_MESSAGE.userDoesNotExist,
      });
    }

    if (!(await comparePassword(password, account.PASSWORD))) {
      throw new CustomError({
        code: 401,
        ...ERROR_MESSAGE.incorrectPassword,
      });
    }

    let access_token = await generateAccessToken({
      employee_id: account.EMPLOYEE_ID,
      employee_name: account.EMPLOYEE.EMPLOYEE_NAME,
      username: account.USERNAME,
      is_active: account.ISACTIVE,
      role: account.ROLE,
    });

    if (!access_token)
      throw new CustomError({
        code: 500,
        ...ERROR_MESSAGE.invalidGeneratedAccessToken,
      });

    return res.json({
      access_token: access_token,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  handleLogin,
};
