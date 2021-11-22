const { APPOINTMENT, PATIENT, DIAGNOSTIC } = require('../../models')

const moment = require('moment')

exports.createAppointment = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Không để ô trống!"
            })
        }
        let id = req.body.patient.id
        let identityNumber = req.body.patient.identity_number
        let patient
        //kiem tra patient co ton tai chua
        const checkPatient = async (condition) => {
            try {
                let oldPatient = await PATIENT.findOne(condition)
                if (!oldPatient) {
                    return null
                }
                return oldPatient
            } catch (error) {
                console.log(error)
                throw Error
            }
        }
        if (id) {
            try {
                patient = await checkPatient({ where: { PATIENT_ID: id } })
                if (!patient)
                    return res.status(404).send('Không tìm thấy bệnh nhân nào!')
            } catch (error) {
                console.log(error)
                throw Error
            }
        } else {
            try {
                patient = await checkPatient({ where: { IDENTITY_NUMBER: identityNumber } })
            } catch (error) {
                console.log(error)
                throw Error
            }
            if (!patient) {
                try {
                    const newPatient = req.body.patient
                    patient = new PATIENT({
                        PATIENT_NAME: newPatient.patient_name,
                        IDENTITY_NUMBER: newPatient.identity_number,
                        PHONE: newPatient.phone,
                        GENDER: newPatient.gender,
                        DATE_OF_BIRTH: moment(newPatient.date_of_birth, 'DD/MM/YYYY'),
                        ADDRESS: newPatient.address,
                    })
                    await patient.save()
                } catch (error) {
                    console.log(error)
                    throw Error(error)
                }
            }
        }
        let appointment = new APPOINTMENT({
            PATIENT_ID: patient.PATIENT_ID,
            DOCTOR_ID: req.body.appointment.doctor_id,
            TIMES: moment.utc(req.body.appointment.time, 'DD/MM/YYYY h:mm:ss'),
        })
        await appointment.save()
        return res.status(200).send('Đã thêm lịch hẹn thành công!')
    } catch (e) {
        console.log(e)
        return res.status(500).send('Lỗi sever!')
    }
}

exports.getAllAppointment = async (req, res) => {
    try {
        let appointment = await APPOINTMENT.findAll({
            //attributes: []
        })
        return res.json(appointment)
    } catch (e) {
        console.log(e)
        return res.status(500).send('Lỗi sever!')
    }
}

exports.updateAppointment = async (req, res) => {
    try {
        let id = req.params.id
        console.log(id)
        let appointment = await APPOINTMENT.findOne({
            where: { APPOINTMENT_ID: id }
        })
        console.log(req.body.DOCTOR_ID)
        if (appointment) {
            appointment.DOCTOR_ID = req.body.DOCTOR_ID
            appointment.TIMES = new Date(req.body.TIMES)
            //new Date(req.body.TIMES)
            appointment.PATIENT_ID = req.body.PATIENT_ID
            await appointment.save()
            return res.status(200).send('Cập nhật thành công!')

        }
    } catch (e) {
        console.log(e)
        return res.status(500).send('Lỗi sever!')
    }
}

exports.deleteAppointment = async (req, res) => {
    try {
        let id = req.params.id
        let appointment = await APPOINTMENT.findOne({
            where: { APPOINTMENT_ID: id }
        })
        if (appointment) {
            await appointment.destroy()
            return res.send('Xóa thành công!')
        }
        else {
            return res.status(404).send('Không có gì để xóa!')
        }
    } catch (e) {
        return res.status(500).send('Lỗi sever!')
    }
}
exports.createDianosticNew = async (req, res) => {
    //FromAPPOINTMENT
    try {
        let id = req.params.id
        let appointment = await APPOINTMENT.findOne({
            where: {APPOINTMENT_ID: id}
        })
        if(appointment){
            let diagnostic = DIAGNOSTIC.create({
                DOCTOR_ID : appointment.DOCTOR_ID,
                PATIENT_ID: appointment.PATIENT_ID,
                CREATE_AT: moment.utc(req.body.CREATE_AT, 'DD/MM/YYYY h:mm:ss') // sữa lại thời gian hiện tại
            })
           await diagnostic.save()
        }else{
            return res.status(404).send('Không có thông tin')
        }
        return res.status(200).send('Tạo thành công!')
    } catch (error) {
        return res.status(500).send('Lỗi sever!')
    }
}