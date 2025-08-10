import {
  comparePassword,
  generateAccessToken,
} from "./authentication.methods.js";
import { AccountServices } from "../../services/databaseServices/ACCOUNT.services.js";
import { errorMessage } from "../../services/customError.js";

const handleLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const account = await AccountServices.instance.findAccoutByUsername(
      username,
      {
        include: ["EMPLOYEE"],
      },
    );

    if (!account) {
      throw errorMessage.userDoesNotExist;
    }

    if (!(await comparePassword(password, account.PASSWORD))) {
      throw errorMessage.incorrectPassword;
    }

    const access_token = generateAccessToken({
      employee_id: account.EMPLOYEE_ID,
      employee_name: account.EMPLOYEE.EMPLOYEE_NAME,
      username: account.USERNAME,
      is_active: account.ISACTIVE,
      role: account.ROLE,
    });

    if (!access_token) throw errorMessage.invalidGeneratedAccessToken;

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
