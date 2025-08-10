import database from "../../models/index.js";
const { APPOINTMENTREQUEST } = database;
import moment from "moment";
import type { AppointmentRequestPayload } from "../../interfaces/customer.interface.js";

const controller = () => {
  const createAppointmentRequest = async (req, res) => {
    console.log(req.body);
    const { patient: patientData, appointment: appointmentData } =
      req.body as AppointmentRequestPayload;
    try {
      const request = new APPOINTMENTREQUEST({
        createAt: new Date(),
        patientName: patientData.patientName,
        identityNumber: patientData.identityNumber,
        phone: patientData.phone,
        gender: patientData.gender,
        dateOfBirth: moment(patientData.dateOfBirth, "DD/MM/YYYY"),
        address: patientData.address,
        doctorId: appointmentData.doctorId,
        times: moment.utc(appointmentData.time, "DD/MM/YYYY h:mm:ss"),
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
