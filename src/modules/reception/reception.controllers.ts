import database from "../../models/index.js";
const {
  sequelize,
  APPOINTMENT,
  Patient,
  DIAGNOSTIC,
  APPOINTMENTREQUEST,
  SERVICEFORDIAGNOSTIC,
} = database;
import diagnosticStack from "../../static/stack.js";
import moment from "moment";
import { Op, QueryTypes } from "sequelize";
import { AppointmentService } from "../../services/databaseServices/appointment.services.js";
import { errorMessage } from "../../services/customError.js";
import { PatientService } from "../../services/databaseServices/patient.services.js";

const controller = () => {
  const createAppointment = async (req, res) => {
    try {
      if (!req.body) throw errorMessage.emptyRequestBody;
      console.log(req.body);

      const { patient: patientInfo, appointment: appointmentInfo } = req.body;
      const { id, identityNumber } = patientInfo;

      let patientHasExist = false;
      let patientId = id;

      if (id) {
        const patient = await PatientService.instance.getPatientById(id);
        if (!patient) throw errorMessage.invalidPatientId;
        else {
          patientHasExist = true;
        }
      } else if (identityNumber) {
        const patient =
          await PatientService.instance.getPatientByIdentityNumber(
            identityNumber,
          );

        if (patient) {
          patientHasExist = true;
        }

        if (!patientHasExist) {
          const newPatient = PatientService.instance.addNewPatient({
            patientInfo,
          });
          patientId = newPatient.patientId;
        }
      }
      const appointment = await AppointmentService.instance.createAppointMent({
        ...appointmentInfo,
        patientId: patientId,
      });
      return res.status(200).json(appointment);
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const getAllAppointment = async (_, res) => {
    try {
      const appointment = await AppointmentService.instance.getAllAppointment();
      return res.json(appointment);
    } catch (e) {
      console.log(e);
      throw errorMessage.serverError;
    }
  };

  const getAppointmentInDay = async (req, res) => {
    try {
      const fromday = req.body.fromday;
      // const today = req.body.fromday;
      const appointment = await APPOINTMENT.findAll({
        //where: { [Op.and]: [ { CREATE_AT: { [Op.gte]: fromday } }, { CREATE_AT: { [Op.lte]: today }} ] }
        where: { CREATE_AT: { [Op.gte]: fromday } },
      });
      if (appointment) {
        return res.json(appointment);
      } else {
        return res.status(404).send("Không tìm thấy ngày cần tìm");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const getAppointmentByWeek = async (req, res) => {
    console.log(req.body);
    const dateInWeek = moment(req.body.date, "DD/MM/YYYY");
    try {
      const appointment = await sequelize.query(
        `SELECT AP.APPOINTMENT_ID, AP.CREATE_AT, AP.TIME, PA.PATIENT_ID, PA.PATIENT_NAME, EP.EMPLOYEE_ID, EP.EMPLOYEE_NAME, AP.TYPE_ID FROM APPOINTMENT AP JOIN PATIENT PA ON AP.PATIENT_ID = PA.PATIENT_ID JOIN EMPLOYEE EP ON AP.DOCTOR_ID = EP.EMPLOYEE_ID WHERE WEEK(AP.TIME) = WEEK(?)`,
        {
          replacements: [dateInWeek.toDate()],
          type: QueryTypes.SELECT,
        },
      );
      return res.json(appointment);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi server");
    }
  };

  const getAppointmentById = async (req, res) => {
    const id = req.params.id;
    try {
      const appointment = await APPOINTMENT.findOne({
        where: {
          APPOINTMENT_ID: id,
        },
      });
      if (appointment) return res.json(appointment);
      else return res.status(404).send("Không tìm thấy lịch hẹn nào");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi server");
    }
  };

  const updateAppointment = async (req, res) => {
    try {
      const id = req.params.id;
      const appointment = await APPOINTMENT.findOne({
        where: { APPOINTMENT_ID: id },
      });
      if (appointment) {
        appointment.DOCTOR_ID = req.body.DOCTOR_ID
          ? req.body.DOCTOR_ID
          : appointment.DOCTOR_ID;
        appointment.TIMES = req.body.TIMES
          ? moment.utc(req.body.TIMES, "DD/MM/YYYY h:mm:ss")
          : appointment.TIMES;
        appointment.patientId = req.body.patientId
          ? req.body.patientId
          : appointment.patientId;
        await appointment.save();
        return res.status(200).send("Cập nhật thành công!");
      }
    } catch (e) {
      console.log(e);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const deleteAppointment = async (req, res) => {
    try {
      const id = req.params.id;
      const appointment = await APPOINTMENT.findOne({
        where: { APPOINTMENT_ID: id },
      });
      if (appointment) {
        await appointment.destroy();
        return res.status(200).send("Xóa thành công!");
      } else {
        return res.status(404).send("Không có gì để xóa!");
      }
    } catch (e) {}
  };
  //status: 0: chưa xác nhận, chưa xem, 1: đã xem, chưa xác nhận
  //2: đã xác nhận
  //3:đã hủy
  const getAppointmentRequest = async (req, res) => {
    try {
      const appointmentRequest =
        await AppointmentService.instance.getAllAppointmentRequest();
      return res.json(appointmentRequest);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi server");
    }
  };

  const updateAppointmentStatus = async (req, res) => {
    const id = req.params.id;
    try {
      const request = await APPOINTMENTREQUEST.findOne({
        where: {
          REQUEST_ID: id,
        },
      });
      if (!request) return res.status(409).send("Không tìm thấy yêu cầu nào!");
      if (req.body.status == 2) {
        console.log("change status to 2");
      }
      request.STATUS = req.body.status ? req.body.status : request.STATUS;
      await request.save();
      return res.send("Update thành công");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi server");
    }
  };

  //   const getDiagnosticStack = (req, res) => {
  //     return res.json(diagnosticStack);
  //   };

  const pushDiagnosticStack = (diagnostic, room) => {
    let order;
    if (room == 1) {
      order = diagnosticStack.room1.addPatientToLast(diagnostic);
    } else {
      order = diagnosticStack.room2.addPatientToLast(diagnostic);
    }
    return order;
  };

  const createPatient = async (req, res) => {
    try {
      if (!req.body) {
        res.status(400).send({
          message: "Không để ô trống",
        });
      }
      const identityNumber = req.body.identityNumber;
      const pattient = await Patient.findOne({
        where: { identityNumber: identityNumber },
      });
      if (!pattient) {
        const newPatinent = new Patient({
          patientName: req.body.patientName,
          identityNumber: req.body.identityNumber,
          phone: req.body.phone,
          gender: req.body.gender,
          dateOfBirth: moment(req.body.dateOfBirth, "DD/MM/YYYY"),
          address: req.body.address,
        });
        await newPatinent.save();
      } else {
        return res.status(409).send("Số CMND đã tồn tại");
      }
      return res.status(200).send("Tạo thành công!");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const getAllPatient = async (req, res) => {
    try {
      const patient = await Patient.findAll({});
      return res.json(patient);
    } catch (e) {
      return res.status(500).send("Lỗi sever!");
    }
  };

  const getPatientById = async (req, res) => {
    try {
      const id = req.params.id;
      const patient = await Patient.findOne({
        where: { patientId: id },
      });
      if (patient) {
        return res.json(patient);
      } else {
        return res.status(404).send("Không có bệnh nhân này!");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const updatePatient = async (req, res) => {
    try {
      const id = req.params.id;
      const patient = await Patient.findOne({
        where: { patientId: id },
      });
      let cmnd;
      const identityNumber = req.body.identityNumber;
      //kiem tra cmnd co ton tai chua
      const checkIdentityNumber = async (condition) => {
        try {
          const oldIdentityNumber = await Patient.findOne(condition);
          if (!oldIdentityNumber) {
            return null;
          }
          return oldIdentityNumber;
        } catch (error) {
          console.log(error);
          throw Error;
        }
      };
      try {
        cmnd = await checkIdentityNumber({
          where: { identityNumber: identityNumber },
        });
      } catch (error) {
        console.log(error);
        throw Error;
      }
      if (!cmnd) {
        patient.patientName = req.body.patientName
          ? req.body.patientName
          : patient.patientName;
        patient.identityNumber = req.body.identityNumber
          ? req.body.identityNumber
          : patient.identityNumber;
        patient.phone = req.body.phone ? req.body.phone : patient.phone;
        patient.gender = req.body.gender ? req.body.gender : patient.gender;
        patient.dateOfBirth = req.body.dateOfBirth
          ? moment(req.body.dateOfBirth, "DD/MM/YYYY")
          : patient.dateOfBirth;
        patient.address = req.body.address ? req.body.address : patient.address;
        await patient.save();
        return res.status(200).send("Cập nhật thành công!");
      } else {
        return res.status(404).send("Số CMND đã tồn tại!");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const deletePatient = async (req, res) => {
    try {
      const id = req.params.id;
      const patient = await Patient.findOne({
        where: { patientId: id },
      });
      if (patient) {
        await patient.destroy();
        return res.status(200).send("Xóa thành công!");
      } else {
        return res.status(404).send("Không có gì để xóa!");
      }
    } catch (error) {
      return res.status(500).send("Lỗi sever!");
    }
  };

  const createDiagnostic = async (req, res) => {
    console.log(req.body);
    try {
      let patient;
      if (req.body.patientId) {
        patient = await Patient.findOne({
          where: {
            patientId: req.body.patientId,
          },
        });
      } else {
        patient = await Patient.findOne({
          where: {
            [Op.or]: [
              { phone: req.body.phone },
              { identityNumber: req.body.identityNumber },
            ],
          },
        });
        if (!patient) {
          patient = new Patient({
            patientName: req.body.patientName,
            identityNumber: req.body.identityNumber,
            phone: req.body.phone,
            gender: req.body.gender,
            dateOfBirth: moment(req.body.dateOfBirth, "DD/MM/YYYY"),
            address: req.body.address,
            occupation: req.body.occupation,
          });
          await patient.save();
        }
      }
      const diagnostic = new DIAGNOSTIC({
        patientId: patient.patientId,
        CREATE_AT: moment.utc(req.body.CREATE_AT, "DD/MM/YYYY h:mm:ss"),
        DOCTOR_ID: req.body.DOCTOR_ID,
        DIAGNOSTIC_FEE: req.body.DIAGNOSTIC_FEE,
        RECEPTION: req.body.RECEPTIONIST,
        NOTE: req.body.NOTE,
      });
      await diagnostic.save();
      const services = req.body.SERVICES;
      services.map(async (service) => {
        const serviceInsert = new SERVICEFORDIAGNOSTIC({
          DIAGNOSTIC_ID: diagnostic.DIAGNOSTIC_ID,
          SERVICE_ID: service,
        });
        await serviceInsert.save();
      });
      const lastDiagnostic = await DIAGNOSTIC.findOne({
        where: {
          DIAGNOSTIC_ID: diagnostic.DIAGNOSTIC_ID,
        },
        include: ["DOCTOR", "patient", "SERVICE_ID_SERVICEs"],
      });
      const order = pushDiagnosticStack(lastDiagnostic, 1);
      console.log(order);
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const getAllDiagnostic = async (req, res) => {
    try {
      const diagnostic = await DIAGNOSTIC.findAll({
        include: ["Patient"],
      });
      return res.json(diagnostic);
    } catch (error) {
      return res.status(500).send("Lỗi sever!");
    }
  };

  const getDiagnosticById = async (req, res) => {
    try {
      const id = req.params.id;
      const diagnostic = await DIAGNOSTIC.findOne({
        where: { DIAGNOSTIC_ID: id },
      });
      if (diagnostic) {
        return res.json(diagnostic);
      } else {
        return res.status(404).send("Không có phiếu khám để tìm!");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const updateDiagnostic = async (req, res) => {
    try {
      const id = req.params.id;
      const diagnostic = await DIAGNOSTIC.findOne({
        where: { DIAGNOSTIC_ID: id },
      });
      if (diagnostic) {
        diagnostic.patientId = req.body.patientId
          ? req.body.patientId
          : diagnostic.patientId;
        diagnostic.DOCTOR_ID = req.body.DOCTOR_ID
          ? req.body.DOCTOR_ID
          : diagnostic.DOCTOR_ID;
        await diagnostic.save();
        return res.status(200).send("Cập nhật thành công!");
      } else {
        return res.status(404).send("Không có phiếu khám để sửa!");
      }
    } catch (error) {
      return res.status(500).send("Lỗi sever");
    }
  };

  const deleteDiagnostic = async (req, res) => {
    try {
      const id = req.params.id;
      const diagnostic = await DIAGNOSTIC.findOne({
        where: { DIAGNOSTIC_ID: id },
      });
      if (diagnostic) {
        await diagnostic.destroy();
        return res.status(200).send("Xóa thành công phiếu khám!");
      } else {
        return res.status(404).send("Không có gì để xóa!");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi sever!");
    }
  };

  const createDianosticNew = async (req, res) => {
    //FromAPPOINTMENT
    try {
      const id = req.params.id;
      const appointment = await APPOINTMENT.findOne({
        where: { APPOINTMENT_ID: id },
      });
      if (appointment) {
        const diagnostic = DIAGNOSTIC.create({
          DOCTOR_ID: appointment.DOCTOR_ID,
          patientId: appointment.patientId,
          CREATE_AT: moment.utc(req.body.CREATE_AT, "DD/MM/YYYY h:mm:ss"), // sữa lại thời gian hiện tại
        });
        await diagnostic.save();
      } else {
        return res.status(404).send("Không có thông tin");
      }
      return res.status(200).send("Tạo thành công!");
    } catch (error) {
      return res.status(500).send("Lỗi sever!");
    }
  };

  const getDiagnosticStack = async (req, res) => {
    const room1 = diagnosticStack.room1.getPatientStack();
    const room2 = diagnosticStack.room2.getPatientStack();
    return res.json({ room1, room2 });
  };

  return {
    createAppointment,
    getAllAppointment,
    getAppointmentInDay,
    getAppointmentByWeek,
    getAppointmentById,
    updateAppointment,
    deleteAppointment,
    getAppointmentRequest,
    updateAppointmentStatus,
    pushDiagnosticStack,
    createPatient,
    getAllPatient,
    getPatientById,
    updatePatient,
    deletePatient,
    createDiagnostic,
    getAllDiagnostic,
    getDiagnosticById,
    updateDiagnostic,
    deleteDiagnostic,
    createDianosticNew,
    getDiagnosticStack,
  };
};

export default controller();
