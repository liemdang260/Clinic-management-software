import { Patient } from "../../models/index.js";
import { errorMessage } from "../customError.js";

class PatientService {
  static _instance;

  static get instance() {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  async getPatientById(id) {
    try {
      return await Patient.findOne({
        where: { patientId: id },
      });
    } catch (error) {
      throw errorMessage.serverError;
    }
  }

  async getPatientByIdentityNumber(identityNumber) {
    try {
      return await Patient.findOne({
        where: { identityNumber: identityNumber },
      });
    } catch (error) {
      throw errorMessage.serverError;
    }
  }

  async addNewPatient(patientInfo) {
    try {
      const patient = new Patient(patientInfo);
      await patient.save();
    } catch (error) {
      throw errorMessage.serverError;
    }
  }
}

export { PatientService };
