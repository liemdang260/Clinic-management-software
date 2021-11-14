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
        let appointment = await APPOINTMENT.findOne({
            where: { APPOINTMENT_ID: id }
        })
        if (appointment) {
            appointment.DOCTOR_ID = req.body.DOCTOR_ID
            appointment.TIMES = moment.utc(req.body.TIMES, 'DD/MM/YYYY h:mm:ss')
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
            return res.status(200).send('Xóa thành công!')
        }
        else {
            return res.status(404).send('Không có gì để xóa!')
        }
    } catch (e) {

    }
}
exports.createPatient = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Không để ô trống"
            })
        }
        let identity_number = req.body.IDENTITY_NUMBER
        let pattient = await PATIENT.findOne({
            where: { IDENTITY_NUMBER: identity_number }
        })
        if (!pattient) {
            let newPatinent = new PATIENT({
                PATIENT_NAME: req.body.PATIENT_NAME,
                IDENTITY_NUMBER: req.body.IDENTITY_NUMBER,
                PHONE: req.body.PHONE,
                GENDER: req.body.GENDER,
                DATE_OF_BIRTH: moment(req.body.DATE_OF_BIRTH, 'DD/MM/YYYY'),
                ADDRESS: req.body.ADDRESS,
            })
            await newPatinent.save()
        } else {
            return res.status(409).send('Số CMND đã tồn tại')
        }
        return res.status(200).send("Tạo thành công!")
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi sever!')
    }
}
exports.getAllPatient = async (req, res) => {
    try {
        let patient = await PATIENT.findAll({
        })
        return res.json(patient)
    } catch (e) {
        return res.status(500).send("Lỗi sever!")
    }
}
exports.updatePatient = async (req, res) => {
    try {
        let id = req.params.id
        let patient = await PATIENT.findOne({
            where: { PATIENT_ID: id }
        })
        if (patient) {
            patient.PATIENT_NAME = req.body.PATIENT_NAME,
            patient.IDENTITY_NUMBER = req.body.IDENTITY_NUMBER,
            patient.PHONE = req.body.PHONE,
            patient.GENDER = req.body.GENDER,
            patient.DATE_OF_BIRTH = moment(req.body.DATE_OF_BIRTH, 'DD/MM/YYYY')
            patient.ADDRESS = req.body.ADDRESS
            await patient.save()
            return res.status(200).send('Cập nhật thành công!')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi sever!')
    }
}
exports.deletePatient = async (req, res) => {
    try {
        let id = req.params.id
        let patient = await PATIENT.findOne({
            where: { PATIENT_ID: id }
        })
        if (patient) {
            await patient.destroy()
            return res.status(200).send('Xóa thành công!')
        }
        else {
            return res.status(404).send('Không có gì để xóa!')
        }
    } catch (e) {
        return res.status(500).send('Lỗi sever!')
    }
}
exports.createDiagnostic = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Không để ô trống!"
            })
        }
        let diagnostic = new DIAGNOSTIC({
            PATIENT_ID: req.body.PATIENT_ID,
            CREATE_AT: moment.utc(req.body.CREATE_AT, 'DD/MM/YYYY h:mm:ss'),
            DOCTOR_ID: req.body.DOCTOR_ID,
            DIAGNOSTIC_FEE: req.body.DIAGNOSTIC_FEE
        })
        await diagnostic.save()
        return res.status(200).send('Tạo phiếu khám thành công!')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi sever!')
    }
}
exports.deleteDiagnostic = async (req, res) => {
    try {
        let id = req.params.id
        let diagnostic = await DIAGNOSTIC.findOne({
            where: { DIAGNOSTIC_ID: id }
        })
        if (diagnostic) {
            await diagnostic.destroy()
            return res.status(200).send('Xóa thành công phiếu khám!')
        }
        else {
            return res.status(404).send('Không có gì để xóa!')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi sever!')
    }
}