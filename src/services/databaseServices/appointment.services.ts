import { Appointment } from "../../models/index.js";
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
      return await Appointment.findAll({
        include: ["patient", "doctor"],
      });
    } catch (error) {
      throw errorMessage.serverError;
    }
  }

  async createAppointMent(appointmentInfo) {
    const requiredFields = [
      "createAt",
      "time",
      "patientId",
      "typeId",
      "statusId",
      "doctorId",
    ];
    for (const field of requiredFields) {
      if (!appointmentInfo[field]) {
        throw errorMessage.emptyRequestBody;
      }
    }
    try {
      const appointment = new Appointment(appointmentInfo);
      await appointment.save();
      return appointment;
    } catch (error) {
      console.log("service", error);
      throw errorMessage.serverError;
    }
  }

  async getAllAppointmentRequest() {
    try {
      return Appointment.findAll({
        where: {
          [Op.or]: [{ statusId: 1 }, { statusId: 2 }],
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
