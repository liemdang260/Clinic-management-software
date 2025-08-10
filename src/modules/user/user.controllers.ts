import database from "../../models/index.js";
import { enCryptPassword } from "../authentication/authentication.methods.js";
import { Op } from "sequelize";
import moment from "moment";

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
      const id = req.userInfo.employee_id;
      const user = await Employee.findOne({
        where: { employeeId: id },
      });
      if (user) {
        user.employeeName = req.body.employeeName
          ? req.body.employeeName
          : user.employeeName;
        user.identityNumber = req.body.identityNumber
          ? req.body.identityNumber
          : user.identityNumber;
        user.phone = req.body.phone ? req.body.phone : user.phone;
        user.gender = req.body.gender ? req.body.gender : user.gender;
        user.dateOfBirth = req.body.dateOfBirth
          ? moment(req.body.dateOfBirth, "DD/MM/YYYY")
          : user.dateOfBirth;
        user.employeeAddress = req.body.employeeAddress
          ? req.body.employeeAddress
          : user.employeeAddress;
        user.positionId = req.body.positionId
          ? req.body.positionId
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
      const oldPassHash = await enCryptPassword(req.body.oldPass);
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
      account.password = await enCryptPassword(req.body.newPass);
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
