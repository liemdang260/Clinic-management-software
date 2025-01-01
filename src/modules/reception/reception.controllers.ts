import { Request, Response } from "express";
import moment from "moment";
import { FindOptions, Op, QueryTypes } from "sequelize";
import {
  Appointment,
  AppointmentRequest,
  Diagnostic,
  Patient,
  PatientAttributes,
  ServiceForDiagnostic,
} from "../../models/index.js";
import { SequelizeConnection } from "../../databaseConnection";

export const createAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Không để ô trống!",
      });
    }
    let id = req.body.patient.id;
    let identityNumber = req.body.patient.identity_number;
    let patient;
    //kiem tra patient co ton tai chua
    const checkPatient = async (condition: FindOptions<PatientAttributes>) => {
      try {
        let oldPatient = await Patient.findOne(condition);
        if (!oldPatient) {
          return null;
        }
        return oldPatient;
      } catch (error) {
        console.log(error);
        throw Error;
      }
    };
    if (id) {
      try {
        patient = await checkPatient({ where: { id: id } });
        if (!patient) {
          res.status(404).send("Không tìm thấy bệnh nhân nào!");
          return;
        }
      } catch (error) {
        console.log(error);
        throw Error;
      }
    } else {
      try {
        patient = await checkPatient({
          where: { identityNumber: identityNumber },
        });
      } catch (error) {
        console.log(error);
        throw Error;
      }
      if (!patient) {
        try {
          const newPatient = req.body.patient;
          patient = new Patient({
            name: newPatient.patient_name,
            identityNumber: newPatient.identity_number,
            phone: newPatient.phone,
            gender: newPatient.gender,
            // TODO: update it
            birthday: new Date(Date.now()),
            address: newPatient.address,
            occupation: newPatient.occupation,
          });
          await patient.save();
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
    }
    let appointment = new Appointment({
      patientId: patient.id,
      doctorId: req.body.appointment.doctor_id,
      // TODO: Update it
      timestamp: new Date(Date.now()),
      type: req.body.appointment.type,
      status: req.body.appointment.status,
    });
    await appointment.save();
    res.status(200).send("Đã thêm lịch hẹn thành công!");
    return;
  } catch (e) {
    console.log(e);
    res.status(500).send("Lỗi sever!");
    return;
  }
};
export const getAllAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let appointment = await Appointment.findAll({
      //attributes: []
    });
    res.json(appointment);
    return;
  } catch (e) {
    console.log(e);
    res.status(500).send("Lỗi sever!");
    return;
  }
};
export const getAppointmentInDay = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let fromday = req.body.fromday;
    let today = req.body.fromday;
    let appointment = await Appointment.findAll({
      //where: { [Op.and]: [ { CREATE_AT: { [Op.gte]: fromday } }, { CREATE_AT: { [Op.lte]: today }} ] }
      where: { createdAt: { [Op.gte]: fromday } },
    });
    if (appointment) {
      res.json(appointment);
      return;
    } else {
      res.status(404).send("Không tìm thấy ngày cần tìm");
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi sever!");
    return;
  }
};

export const getAppointmentByWeek = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  let dateInWeek = moment(req.body.date, "DD/MM/YYYY");
  try {
    let appointment = await SequelizeConnection.instance
      .getClient()!
      .query(
        `SELECT AP.Appointment_ID, AP.TIMES, PA.PATIENT_ID, PA.PATIENT_NAME, EP.EMPLOYEE_ID, EP.EMPLOYEE_NAME, AP.[TYPE] FROM Appointment AP JOIN PATIENT PA ON AP.PATIENT_ID = PA.PATIENT_ID JOIN EMPLOYEE EP ON AP.DOCTOR_ID = EP.EMPLOYEE_ID WHERE DATEPART(WEEK, [TIMES]) = DATEPART(WEEK, ?)`,
        {
          replacements: [dateInWeek.toDate()],
          type: QueryTypes.SELECT,
        }
      );
    res.json(appointment);
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server");
    return;
  }
};

export const getAppointmentById = async (
  req: Request,
  res: Response
): Promise<void> => {
  let id = req.params.id;
  try {
    let appointment = await Appointment.findOne({
      where: {
        id: id,
      },
    });
    if (appointment) {
      res.json(appointment);
      return;
    }

    res.status(404).send("Không tìm thấy lịch hẹn nào");
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server");
    return;
  }
};
export const updateAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let id = req.params.id;
    let appointment = await Appointment.findOne({
      where: { id: id },
    });
    if (appointment) {
      appointment.doctorId = req.body.DOCTOR_ID
        ? req.body.DOCTOR_ID
        : appointment.doctorId;
      appointment.timestamp = req.body.TIMES
        ? moment.utc(req.body.TIMES, "DD/MM/YYYY h:mm:ss").toDate()
        : appointment.timestamp;
      appointment.patientId = req.body.PATIENT_ID
        ? req.body.PATIENT_ID
        : appointment.patientId;
      await appointment.save();
      res.status(200).send("Cập nhật thành công!");
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Lỗi sever!");
    return;
  }
};
export const deleteAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let id = req.params.id;
    let appointment = await Appointment.findOne({
      where: { id: id },
    });
    if (appointment) {
      await appointment.destroy();
      res.status(200).send("Xóa thành công!");
      return;
    } else {
      res.status(404).send("Không có gì để xóa!");
      return;
    }
  } catch (e) {}
};
//status: 0: chưa xác nhận, chưa xem, 1: đã xem, chưa xác nhận
//2: đã xác nhận
//3:đã hủy
export const getAppointmentRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let request = await AppointmentRequest.findAll({
      where: {
        [Op.or]: [{ status: 0 }, { status: 1 }],
      },
    });
    console.log(request[0].patientId);
    res.json(request);
    return;
  } catch (error) {
    res.status(500).send("Lỗi server");
    return;
  }
};

export const updateAppointmentStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  let id = req.params.id;
  try {
    let request = await AppointmentRequest.findOne({
      where: {
        id: id,
      },
    });
    if (!request) {
      res.status(409).send("Không tìm thấy yêu cầu nào!");
      return;
    }
    if (req.body.status == 2) {
      console.log("change status to 2");
    }
    request.status = req.body.status ? req.body.status : request.status;

    await request.save();
    res.send("Update thành công");
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server");
    return;
  }
};

// const pushDiagnosticStack = (diagnostic, room) => {
//   let order;
//   if (room == 1) {
//     order = diagnosticStack.room1.addPatientToLast(diagnostic);
//   } else {
//     order = diagnosticStack.room2.addPatientToLast(diagnostic);
//   }
//   return order;
// };

export const createPatient = async (
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
    let pattient = await Patient.findOne({
      where: { identityNumber: identity_number },
    });
    if (!pattient) {
      let newPatinent = new Patient({
        name: req.body.PATIENT_NAME,
        identityNumber: req.body.IDENTITY_NUMBER,
        phone: req.body.PHONE,
        gender: req.body.GENDER,
        birthday: moment(req.body.DATE_OF_BIRTH, "DD/MM/YYYY").toDate(),
        address: req.body.ADDRESS,
      });
      await newPatinent.save();
    } else {
      res.status(409).send("Số CMND đã tồn tại");
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
export const getAllPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let patient = await Patient.findAll({});
    res.json(patient);
  } catch (e) {
    res.status(500).send("Lỗi sever!");
  }
};
export const getPatientById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let id = req.params.id;
    let patient = await Patient.findOne({
      where: { id: id },
    });
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).send("Không có bệnh nhân này!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi sever!");
  }
};
export const updatePatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let id = req.params.id;
    let patient = await Patient.findOne({
      where: { id: id },
    });

    if (!patient) {
      res.status(404).send("Không tìm thấy khách hàng!");
      return;
    }
    let cmnd;
    let identityNumber = req.body.IDENTITY_NUMBER;
    //kiem tra cmnd co ton tai chua
    const checkIdentity_number = async (condition: any) => {
      try {
        let oldIdentity_number = await Patient.findOne(condition);
        if (!oldIdentity_number) {
          return null;
        }
        return oldIdentity_number;
      } catch (error) {
        console.log(error);
        throw Error;
      }
    };
    try {
      cmnd = await checkIdentity_number({
        where: { IDENTITY_NUMBER: identityNumber },
      });
    } catch (error) {
      console.log(error);
      throw Error;
    }
    if (!cmnd) {
      patient.name = req.body.PATIENT_NAME
        ? req.body.PATIENT_NAME
        : patient.name;
      patient.identityNumber = req.body.IDENTITY_NUMBER
        ? req.body.IDENTITY_NUMBER
        : patient.identityNumber;
      patient.phone = req.body.PHONE ? req.body.PHONE : patient.phone;
      patient.gender = req.body.GENDER ? req.body.GENDER : patient.gender;
      patient.birthday = req.body.DATE_OF_BIRTH
        ? moment(req.body.DATE_OF_BIRTH, "DD/MM/YYYY").toDate()
        : patient.birthday;
      patient.address = req.body.ADDRESS ? req.body.ADDRESS : patient.address;
      await patient.save();
      res.status(200).send("Cập nhật thành công!");
    } else {
      res.status(404).send("Số CMND đã tồn tại!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi sever!");
  }
};
export const deletePatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let id = req.params.id;
    let patient = await Patient.findOne({
      where: { id: id },
    });
    if (patient) {
      await patient.destroy();
      res.status(200).send("Xóa thành công!");
    } else {
      res.status(404).send("Không có gì để xóa!");
    }
  } catch (error) {
    res.status(500).send("Lỗi sever!");
  }
};
export const createDiagnostic = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body);
  try {
    let patient;
    if (req.body.PATIENT_ID) {
      patient = await Patient.findOne({
        where: {
          id: req.body.PATIENT_ID,
        },
      });
    } else {
      patient = await Patient.findOne({
        where: {
          [Op.or]: [
            { phone: req.body.PHONE },
            { identityNumber: req.body.IDENTITY_NUMBER },
          ],
        },
      });
      if (!patient) {
        patient = new Patient({
          name: req.body.PATIENT_NAME,
          identityNumber: req.body.IDENTITY_NUMBER,
          phone: req.body.PHONE,
          gender: req.body.GENDER,
          birthday: moment(req.body.DATE_OF_BIRTH, "DD/MM/YYYY").toDate(),
          address: req.body.ADDRESS,
          occupation: req.body.OCCUPATION,
        });
        await patient.save();
      }
    }
    let diagnostic = new Diagnostic({
      patientId: patient!.id,
      createdAt: moment.utc(req.body.CREATE_AT, "DD/MM/YYYY h:mm:ss").toDate(),
      doctorId: req.body.DOCTOR_ID,
      fee: req.body.Diagnostic_FEE,
      receptionist: req.body.RECEPTIONIST,
      note: req.body.NOTE,
    });
    await diagnostic.save();
    let services = req.body.SERVICES;
    services.map(async (service: any) => {
      let serviceInsert = new ServiceForDiagnostic({
        diagnosticId: diagnostic.id,
        serviceId: service,
      });
      await serviceInsert.save();
    });
    let lastDiagnostic = await Diagnostic.findOne({
      where: {
        id: diagnostic.id,
      },
      include: ["DOCTOR", "PATIENT", "SERVICE_ID_SERVICEs"],
    });
    // let order = pushDiagnosticStack(lastDiagnostic, 1);
    // console.log(order);
    // res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi sever!");
  }
};
export const getAllDiagnostic = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let diagnostic = await Diagnostic.findAll({});
    res.json(diagnostic);
  } catch (error) {
    res.status(500).send("Lỗi sever!");
  }
};
export const getDiagnosticById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let id = req.params.id;
    let diagnostic = await Diagnostic.findOne({
      where: { id: id },
    });
    if (diagnostic) {
      res.json(diagnostic);
    } else {
      res.status(404).send("Không có phiếu khám để tìm!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi sever!");
  }
};
export const updateDiagnostic = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let id = req.params.id;
    let diagnostic = await Diagnostic.findOne({
      where: { id: id },
    });
    if (diagnostic) {
      diagnostic.patient = req.body.PATIENT_ID
        ? req.body.PATIENT_ID
        : diagnostic.patientId;
      diagnostic.doctorId = req.body.DOCTOR_ID
        ? req.body.DOCTOR_ID
        : diagnostic.doctorId;
      await diagnostic.save();
      res.status(200).send("Cập nhật thành công!");
    } else {
      res.status(404).send("Không có phiếu khám để sửa!");
    }
  } catch (error) {
    res.status(500).send("Lỗi sever");
  }
};
export const deleteDiagnostic = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    let id = req.params.id;
    let diagnostic = await Diagnostic.findOne({
      where: { id: id },
    });
    if (diagnostic) {
      await diagnostic.destroy();
      res.status(200).send("Xóa thành công phiếu khám!");
    } else {
      res.status(404).send("Không có gì để xóa!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi sever!");
  }
};
export const createDianosticNew = async (
  req: Request,
  res: Response
): Promise<void> => {
  //FromAppointment
  try {
    let id = req.params.id;
    let appointment = await Appointment.findOne({
      where: { id: id },
    });
    if (appointment) {
      let diagnostic = await Diagnostic.create({
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
        createdAt: moment
          .utc(req.body.CREATE_AT, "DD/MM/YYYY h:mm:ss")
          .toDate(), // sữa lại thời gian hiện tại
      });
      await diagnostic.save();
    } else {
      res.status(404).send("Không có thông tin");
    }
    res.status(200).send("Tạo thành công!");
  } catch (error) {
    res.status(500).send("Lỗi sever!");
  }
};

// export const getDiagnosticStack = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   let room1 = diagnosticStack.room1.getPatientStack();
//   let room2 = diagnosticStack.room2.getPatientStack();
//   res.json({ room1, room2 });
// };
