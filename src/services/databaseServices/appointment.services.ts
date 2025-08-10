import { APPOINTMENT } from "../../models/index.js";
import { errorMessage } from "../customError.js";
import { Op } from "sequelize";

class AppointmentService {
  static _instance;

  static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  async getAllAppointment() {
    try {
      return await APPOINTMENT.findAll({
        include: ["patient", "DOCTOR"],
      });
    } catch (error) {
      throw errorMessage.serverError;
    }
  }

  async createAppointMent(appointmentInfo) {
    const requiredFields = [
      "CREATE_AT",
      "TIME",
      "PATIENT_ID",
      "TYPE_ID",
      "STATUS_ID",
      "DOCTOR_ID",
    ];
    for (const field of requiredFields) {
      if (!appointmentInfo[field]) {
        throw errorMessage.emptyRequestBody;
      }
    }
    try {
      const appointment = new APPOINTMENT(appointmentInfo);
      await appointment.save();
      return appointment;
    } catch (error) {
      console.log("service", error);
      throw errorMessage.serverError;
    }
  }

  async getAllAppointmentRequest() {
    try {
      return APPOINTMENT.findAll({
        where: {
          [Op.or]: [{ STATUS_ID: 1 }, { STATUS_ID: 2 }],
        },
        include: ["patient"],
      });
    } catch (error) {
      console.log(error);
      throw errorMessage.serverError;
    }
  }
}

export { AppointmentService };
