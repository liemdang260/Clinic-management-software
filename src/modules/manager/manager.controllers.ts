import database from "../../models/index.js";
import { enCryptPassword } from "../authentication/authentication.methods.js";

const { Employee, SERVICE, Account } = database;

import moment from "moment";
const controller = () => {
  const createEmployee = async (req, res) => {
    console.log(req.body);
    try {
      const employee = new Employee({
        employeeName: req.body.employeeName,
        identityNumber: req.body.identityNumber,
        phone: req.body.phone,
        gender: req.body.gender,
        dateOfBirth: moment(req.body.dateOfBirth, "DD/MM/YYYY"),
        employeeAddress: req.body.employeeAddress,
        positionId: req.body.positionId,
        startWorkDate: moment(req.body.startWorkDate, "DD/MM/YYYY"),
        salary: req.body.salary,
      });
      await employee.save();

      const hashedPassword = await enCryptPassword(req.body.password);
      const account = new Account({
        employeeId: employee.employeeId,
        username: req.body.username,
        password: hashedPassword,
        isActive: true,
        role: req.body.positionId,
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
      const employee = await Employee.findAll({
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
      const employee = await Employee.findOne({
        where: { employeeId: id },
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
      const employee = await Employee.findOne({
        where: { employeeId: id },
      });
      if (employee) {
        employee.employeeName = req.body.employeeName
          ? req.body.employeeName
          : employee.employeeName;
        employee.identityNumber = req.body.identityNumber
          ? req.body.identityNumber
          : employee.identityNumber;
        employee.phone = req.body.phone ? req.body.phone : employee.phone;
        employee.gender = req.body.gender ? req.body.gender : employee.gender;
        employee.dateOfBirth = req.body.dateOfBirth
          ? moment(req.body.dateOfBirth, "DD/MM/YYYY")
          : employee.dateOfBirth;
        employee.employeeAddress = req.body.employeeAddress
          ? req.body.employeeAddress
          : employee.employeeAddress;
        employee.positionId = req.body.positionId
          ? req.body.positionId
          : employee.positionId;
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
      const employee = await Employee.findOne({
        where: { employeeId: id },
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
