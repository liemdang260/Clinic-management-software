import database from "../../models/index.js";
const { APPOINTMENTREQUEST, PATIENT } = database;
import moment from "moment";
const controller = () => {
  const createAppointmentRequest = async (req, res) => {
    console.log(req.body);
    const patientData = req.body.patient;
    const appointmentData = req.body.appointment;
    try {
      const request = new APPOINTMENTREQUEST({
        CREATE_AT: new Date(),
        PATIENT_NAME: patientData.patient_name,
        IDENTITY_NUMBER: patientData.identity_number,
        PHONE: patientData.phone,
        GENDER: patientData.gender,
        DATE_OF_BIRTH: moment(patientData.date_of_birth, "DD/MM/YYYY"),
        ADDRESS: patientData.ADDRESS,
        DOCTOR_ID: appointmentData.doctor_id,
        TIMES: moment.utc(appointmentData.time, "DD/MM/YYYY h:mm:ss"),
      });
      await request.save();
      return res.send("Tạo thành công");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Lỗi server");
    }
  };

  return {
    createAppointmentRequest,
  };
};

export default controller();
