const { APPOINTMENTREQUEST, PATIENT } = require('../../models')
const moment = require('moment')
exports.createAppointmentRequest = async (req, res) => {
    console.log(req.body)
    let patientData = req.body.patient
    let appointmentData = req.body.appointment
    try {
        let request = new APPOINTMENTREQUEST({
            CREATE_AT: new Date(),
            PATIENT_NAME:patientData.patient_name,
            IDENTITY_NUMBER: patientData.identity_number,
            PHONE: patientData.phone,
            GENDER: patientData.gender,
            DATE_OF_BIRTH: moment(patientData.date_of_birth, 'DD/MM/YYYY') ,
            ADDRESS:  patientData.ADDRESS,
            DOCTOR_ID: appointmentData.doctor_id,
            TIMES: moment.utc(appointmentData.time, 'DD/MM/YYYY h:mm:ss'),

        })
        await request.save()
        return res.send('Tạo thành công')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi server')
    }
}