import { Response } from "express";
import moment from "moment";
import { CustomRequest } from "../../interfaces/CustomRequest.js";
import { Employee } from "../../models/index.js";

export const getProfileById = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    let id = req.userInfo!.id;
    let user = await Employee.findOne({
      where: { id: id },
      include: ["position"],
    });
    if (user) {
      res.json(user);
      return;
    }
    res.status(404).send("Không có thông tin!");
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi sever!");
    return;
  }
};
export const updateProfileById = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    let id = req.userInfo!.id;
    let user = await Employee.findOne({
      where: { id: id },
    });
    if (user) {
      user.name = req.body.EMPLOYEE_NAME ? req.body.EMPLOYEE_NAME : user.name;
      user.identityNumber = req.body.IDENTITY_NUMBER
        ? req.body.IDENTITY_NUMBER
        : user.identityNumber;
      user.phone = req.body.PHONE ? req.body.PHONE : user.phone;
      user.gender = req.body.GENDER ? req.body.GENDER : user.gender;
      user.birthday = req.body.DATE_OF_BIRTH
        ? moment(req.body.DATE_OF_BIRTH, "DD/MM/YYYY").toDate()
        : user.birthday;
      user.address = req.body.Employee_ADDRESS
        ? req.body.Employee_ADDRESS
        : user.address;
      user.position = req.body.POSITION ? req.body.POSITION : user.position;
      await user.save();
      res.status(200).send("Cập nhật thành công!");
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi sever!");
    return;
  }
};
