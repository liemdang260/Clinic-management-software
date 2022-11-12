import database from "../../models/index.js";
import { enCryptPassword } from "../authentication/authentication.methods.js";
import { Op } from "sequelize";
import moment from "moment";

const { EMPLOYEE, ACCOUNT, ROOM, SERVICE } = database;

const controller = () => {
  const getProfileById = async (req, res) => {
    try {
      let id = req.userInfo.employee_id;
      let user = await EMPLOYEE.findOne({
        where: { EMPLOYEE_ID: id },
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
      let id = req.userInfo.employee_id;
      let user = await EMPLOYEE.findOne({
        where: { EMPLOYEE_ID: id },
      });
      if (user) {
        user.EMPLOYEE_NAME = req.body.EMPLOYEE_NAME
          ? req.body.EMPLOYEE_NAME
          : user.EMPLOYEE_NAME;
        user.IDENTITY_NUMBER = req.body.IDENTITY_NUMBER
          ? req.body.IDENTITY_NUMBER
          : user.IDENTITY_NUMBER;
        user.PHONE = req.body.PHONE ? req.body.PHONE : user.PHONE;
        user.GENDER = req.body.GENDER ? req.body.GENDER : user.GENDER;
        user.DATE_OF_BIRTH = req.body.DATE_OF_BIRTH
          ? moment(req.body.DATE_OF_BIRTH, "DD/MM/YYYY")
          : user.DATE_OF_BIRTH;
        user.EMPLOYEE_ADDRESS = req.body.EMPLOYEE_ADDRESS
          ? req.body.EMPLOYEE_ADDRESS
          : user.EMPLOYEE_ADDRESS;
        user.POSITION = req.body.POSITION ? req.body.POSITION : user.POSITION;
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
      let account = await ACCOUNT.findOne({
        where: {
          [Op.and]: [
            { USERNAME: req.userInfo.username },
            { PASSWORD: enCryptPassword(req.body.oldPass) },
          ],
        },
      });
      if (!account) return res.status(409).send("Sai mật khẩu");
      console.log(account);
      account.PASSWORD = enCryptPassword(req.body.newPass);
      await account.save();
      return res.send("Đổi mật khẩu thành công");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const getAllService = async (req, res) => {
    try {
      let service = await SERVICE.findAll();
      return res.json(service);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Lỗi server");
    }
  };

  const getAllDoctor = async (req, res) => {
    try {
      let doctor = await ROOM.findAll({
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
