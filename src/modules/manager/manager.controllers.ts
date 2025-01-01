import { Request, Response } from "express";
import { Employee, Service } from "../../models/index";

export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Không để ô trống",
      });
    }
    let identity_number = req.body.IDENTITY_NUMBER;
    let employee = await Employee.findOne({
      where: { identityNumber: identity_number },
    });
    if (!employee) {
      let newEmployee = new Employee({
        name: req.body.EMPLOYEE_NAME,
        identityNumber: req.body.IDENTITY_NUMBER,
        phone: req.body.PHONE,
        gender: req.body.GENDER,
        // TODO: update it
        birthday: new Date(Date.now()),
        address: req.body.EMPLOYEE_ADDRESS,
        position: req.body.POSITION,
        startDate: new Date(Date.now()),
        salary: req.body.SALARY,
      });
      await newEmployee.save();
    } else {
      res.status(409).send("Số CMND đã tồn tại!");
      return;
    }
    res.status(200).send("Tạo thành công!");
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi sever!");
    return;
  }
};
export const getAllEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let employee = await Employee.findAll({
      //raw: true,
    });
    res.json(employee);
    return;
  } catch (e) {
    res.status(500).send("Lỗi sever!");
    return;
  }
};
export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let id = req.params.id;
    let employee = await Employee.findByPk(id);
    if (employee) {
      res.json(employee);
      return;
    } else {
      res.status(404).send("Không có nhân viên này!");
      return;
    }
  } catch (error) {
    res.status(500).send("Lỗi sever!");
    return;
  }
};
export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let id = req.params.id;
    let employee = await Employee.findByPk(id);
    if (employee) {
      employee.name = req.body.EMPLOYEE_NAME
        ? req.body.EMPLOYEE_NAME
        : employee.name;
      employee.identityNumber = req.body.IDENTITY_NUMBER
        ? req.body.IDENTITY_NUMBER
        : employee.identityNumber;
      employee.phone = req.body.PHONE ? req.body.PHONE : employee.phone;
      employee.gender = req.body.GENDER ? req.body.GENDER : employee.gender;
      employee.birthday = req.body.DATE_OF_BIRTH
        ? new Date(Date.now())
        : employee.birthday;
      employee.address = req.body.EMPLOYEE_ADDRESS
        ? req.body.EMPLOYEE_ADDRESS
        : employee.address;
      employee.position = req.body.POSITION
        ? req.body.POSITION
        : employee.position;
      await employee.save();
      res.status(200).send("Cập nhật thành công!");
      return;
    }
  } catch (error) {
    res.status(500).send("Lỗi sever!");
    return;
  }
};
export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let id = req.params.id;
    let employee = await Employee.findByPk(id);
    if (employee) {
      await employee.destroy();
      res.send("Xóa thành công!");
      return;
    } else {
      res.status(404).send("Không có gì để xóa!");
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Lỗi sever!");
    return;
  }
};
export const changeMedicalExaminationFee = async (
  req: Request,
  res: Response
): Promise<void> => {
  let newFee = {
    id: req.body.id,
    fee: req.body.fee,
  };
  let service = await Service.findByPk(newFee.id);

  if (!service) {
    res.status(404).send("Service not found");
    return;
  }

  service.fee = newFee.fee;
  await service.save();
  res.send(service);
  return;
};
