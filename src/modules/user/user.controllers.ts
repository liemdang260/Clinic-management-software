import database from "../../models/index.js";
import { enCryptPassword } from "../authentication/authentication.methods.js";
import { Op } from "sequelize";
import moment from "moment";
import type {
  UpdateProfileRequest,
  ChangePasswordRequest,
} from "../../interfaces/user.interface.js";

const { Employee, Account, ROOM, SERVICE } = database;

const controller = () => {
  const getProfileById = async (req, res) => {
    try {
      const id = req.userInfo.employee_id;
      const user = await Employee.findOne({
        where: { employeeId: id },
        include: ["position"],
      });
      if (user) {
        return res.json(user);
      }
      return res.status(404).send("Không có thông tin!");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const updateProfileById = async (req, res) => {
    try {
      const requestBody = req.body as UpdateProfileRequest;
      const id = req.userInfo.employee_id;
      const user = await Employee.findOne({
        where: { employeeId: id },
      });
      if (user) {
        user.employeeName = requestBody.employeeName
          ? requestBody.employeeName
          : user.employeeName;
        user.identityNumber = requestBody.identityNumber
          ? requestBody.identityNumber
          : user.identityNumber;
        user.phone = requestBody.phone ? requestBody.phone : user.phone;
        user.gender = requestBody.gender ? requestBody.gender : user.gender;
        user.dateOfBirth = requestBody.dateOfBirth
          ? moment(requestBody.dateOfBirth, "DD/MM/YYYY")
          : user.dateOfBirth;
        user.employeeAddress = requestBody.employeeAddress
          ? requestBody.employeeAddress
          : user.employeeAddress;
        user.positionId = requestBody.positionId
          ? requestBody.positionId
          : user.positionId;
        await user.save();
        return res.status(200).send("Cập nhật thành công!");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const changPassword = async (req, res) => {
    console.log(req.userInfo);
    try {
      const body = req.body as ChangePasswordRequest;
      const oldPassHash = await enCryptPassword(body.oldPass);
      const account = await Account.findOne({
        where: {
          [Op.and]: [
            { username: req.userInfo.username },
            { password: oldPassHash },
          ],
        },
      });
      if (!account) return res.status(409).send("Sai mật khẩu");
      console.log(account);
      account.password = await enCryptPassword(body.newPass);
      await account.save();
      return res.send("Đổi mật khẩu thành công");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const getAllService = async (req, res) => {
    try {
      const service = await SERVICE.findAll();
      return res.json(service);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Lỗi server");
    }
  };

  const getAllDoctor = async (req, res) => {
    try {
      const doctor = await ROOM.findAll({
        include: ["DOCTOR"],
      });
      return res.json(doctor);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  return {
    getProfileById,
    updateProfileById,
    changPassword,
    getAllService,
    getAllDoctor,
  };
};

export default controller();
