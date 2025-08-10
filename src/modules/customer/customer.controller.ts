import database from "../../models/index.js";
const { APPOINTMENTREQUEST, Patient } = database;
import moment from "moment";
const controller = () => {
  const createAppointmentRequest = async (req, res) => {
    console.log(req.body);
    const patientData = req.body.patient;
    const appointmentData = req.body.appointment;
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
