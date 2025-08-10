import {
  comparePassword,
  generateAccessToken,
} from "./authentication.methods.js";
import { AccountServices } from "../../services/databaseServices/account.services.js";
import { errorMessage } from "../../services/customError.js";

const handleLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const account = await AccountServices.instance.findAccoutByUsername(
      username,
      {
        include: ["employee"],
      },
    );

    if (!account) {
      throw errorMessage.userDoesNotExist;
    }

    if (!(await comparePassword(password, account.password))) {
      throw errorMessage.incorrectPassword;
    }

    const access_token = generateAccessToken({
      employee_id: account.employeeId,
      employee_name: account.employee.employeeName,
      username: account.username,
      is_active: account.isActive,
      role: account.role,
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
