import database from "../../models/index.js";
import { enCryptPassword } from "../authentication/authentication.methods.js";

const { EMPLOYEE, SERVICE, ACCOUNT } = database;

import moment from "moment";
const controller = () => {
  const createEmployee = async (req, res) => {
    console.log(req.body);
    try {
      const employee = new EMPLOYEE({
        EMPLOYEE_NAME: req.body.EMPLOYEE_NAME,
        IDENTITY_NUMBER: req.body.IDENTITY_NUMBER,
        PHONE: req.body.PHONE,
        GENDER: req.body.GENDER,
        DATE_OF_BIRTH: req.body.DATE_OF_BIRTH,
        EMPLOYEE_ADDRESS: req.body.EMPLOYEE_ADDRESS,
        POSITION: req.body.POSITION,
        START_WORK_DATE: req.body.START_WORK_DATE,
        SALARY: req.body.SALARY,
      });
      await employee.save();

      const hashedPassword = await enCryptPassword(req.body.PASSWORD);
      const account = new ACCOUNT({
        EMPLOYEE_ID: employee.EMPLOYEE_ID,
        USERNAME: req.body.USERNAME,
        PASSWORD: hashedPassword,
        ISACTIVE: true,
        ROLE: req.body.POSITION,
      });

      await account.save();
      return res.send("Tạo nhân viên thành công");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const getAllEmployee = async (req, res) => {
    try {
      const employee = await EMPLOYEE.findAll({
        //raw: true,
      });
      return res.json(employee);
    } catch (e) {
      return res.status(500).send("Lỗi sever!");
    }
  };

  const getEmployeeById = async (req, res) => {
    try {
      const id = req.params.id;
      const employee = await EMPLOYEE.findOne({
        where: { EMPLOYEE_ID: id },
      });
      if (employee) {
        return res.json(employee);
      } else {
        return res.status(404).send("Không có nhân viên này!");
      }
    } catch (error) {
      return res.status(500).send("Lỗi sever!");
    }
  };

  const updateEmployee = async (req, res) => {
    try {
      const id = req.params.id;
      const employee = await EMPLOYEE.findOne({
        where: { EMPLOYEE_ID: id },
      });
      if (employee) {
        employee.EMPLOYEE_NAME = req.body.EMPLOYEE_NAME
          ? req.body.EMPLOYEE_NAME
          : employee.EMPLOYEE_NAME;
        employee.IDENTITY_NUMBER = req.body.IDENTITY_NUMBER
          ? req.body.IDENTITY_NUMBER
          : employee.IDENTITY_NUMBER;
        employee.PHONE = req.body.PHONE ? req.body.PHONE : employee.PHONE;
        employee.GENDER = req.body.GENDER ? req.body.GENDER : employee.GENDER;
        employee.DATE_OF_BIRTH = req.body.DATE_OF_BIRTH
          ? moment(req.body.DATE_OF_BIRTH, "DD/MM/YYYY")
          : employee.DATE_OF_BIRTH;
        employee.EMPLOYEE_ADDRESS = req.body.EMPLOYEE_ADDRESS
          ? req.body.EMPLOYEE_ADDRESS
          : employee.EMPLOYEE_ADDRESS;
        employee.POSITION = req.body.POSITION
          ? req.body.POSITION
          : employee.POSITION;
        await employee.save();
        return res.status(200).send("Cập nhật thành công!");
      }
    } catch (error) {
      return res.status(500).send("Lỗi sever!");
    }
  };

  const deleteEmployee = async (req, res) => {
    try {
      const id = req.params.id;
      const employee = await EMPLOYEE.findOne({
        where: { EMPLOYEE_ID: id },
      });
      if (employee) {
        await employee.destroy();
        return res.send("Xóa thành công!");
      } else {
        return res.status(404).send("Không có gì để xóa!");
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const createService = async (req, res) => {
    try {
      const service = new SERVICE({
        SERVICE_NAME: req.body.name,
        FEE: req.body.fee,
      });
      await service.save();
      return res.json("Thêm thành công");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Lỗi server");
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

  const changeMedicalExaminationFee = async (req, res) => {
    const newFee = {
      id: req.body.id,
      fee: req.body.fee,
    };
    const fee = await SERVICE.findOne({
      where: {
        SERVICE_ID: newFee.id,
      },
    });
    fee.FEE = newFee.fee;
    await fee.save();
    res.send(fee);
  };

  return {
    createEmployee,
    getAllEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    createService,
    getAllService,
    changeMedicalExaminationFee,
  };
};

export default controller();
