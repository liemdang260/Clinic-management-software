import { PATIENT } from "../../models/index.js";
import { ERROR_MESSAGE } from "../customError.js";

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
      return await PATIENT.findOne({
        where: { PATIENT_ID: id },
      });
    } catch (error) {
      throw ERROR_MESSAGE.serverError;
    }
  }

  async getPatientByIdentityNumber(identityNumber) {
    try {
      return await PATIENT.findOne({
        where: { IDENTITY_NUMBER: identityNumber },
      });
    } catch (error) {
      throw ERROR_MESSAGE.serverError;
    }
  }

  async addNewPatient(patientInfo) {
    try {
      const patient = new PATIENT(patientInfo);
      await patient.save();
    } catch (error) {
      throw ERROR_MESSAGE.serverError;
    }
  }
}

export { PatientService };
