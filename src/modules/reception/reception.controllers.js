const { sequelize, APPOINTMENT, PATIENT, DIAGNOSTIC, APPOINTMENTREQUEST, EMPLOYEE } = require('../../models')
const diagnosticStack = require('../../static/stack')
const moment = require('moment')
const { Op, QueryTypes } = require("sequelize");


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
exports.getAppointmentInDay = async (req, res) => {
    try {
        let fromday = req.body.fromday
        let today = req.body.fromday
        let appointment = await APPOINTMENT.findAll({
            //where: { [Op.and]: [ { CREATE_AT: { [Op.gte]: fromday } }, { CREATE_AT: { [Op.lte]: today }} ] }
            where: { CREATE_AT: { [Op.gte]: fromday } }
        })
        if (appointment) {
            return res.json(appointment)
        }
        else {
            return res.status(404).send('Không tìm thấy ngày cần tìm')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi sever!')
    }
}

exports.getAppointmentByWeek = async (req, res) => {
    console.log(req.body)
    let dateInWeek = moment(req.body.date, 'DD/MM/YYYY')
    try {
        let appointment = await sequelize.query(`SELECT AP.APPOINTMENT_ID, AP.TIMES, PA.PATIENT_ID, PA.PATIENT_NAME, EP.EMPLOYEE_ID, EP.EMPLOYEE_NAME, AP.[TYPE] FROM APPOINTMENT AP JOIN PATIENT PA ON AP.PATIENT_ID = PA.PATIENT_ID JOIN EMPLOYEE EP ON AP.DOCTOR_ID = EP.EMPLOYEE_ID WHERE DATEPART(WEEK, [TIMES]) = DATEPART(WEEK, ?)`,
            {
                replacements: [dateInWeek.toDate()],
                type: QueryTypes.SELECT
            })
        return res.json(appointment)
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi server')
    }
}

exports.getAppointmentById = async (req, res) => {
    let id = req.params.id
    try {
        let appointment = await APPOINTMENT.findOne({
            where: {
                APPOINTMENT_ID: id
            }
        })
        if (appointment)
            return res.json(appointment)
        else
            return res.status(404).send('Không tìm thấy lịch hẹn nào')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi server')
    }
}
exports.updateAppointment = async (req, res) => {
    try {
        let id = req.params.id
        let appointment = await APPOINTMENT.findOne({
            where: { APPOINTMENT_ID: id }
        })
        if (appointment) {
            appointment.DOCTOR_ID = (req.body.DOCTOR_ID) ? req.body.DOCTOR_ID : appointment.DOCTOR_ID
            appointment.TIMES = (req.body.TIMES) ? moment.utc(req.body.TIMES, 'DD/MM/YYYY h:mm:ss') : appointment.TIMES
            appointment.PATIENT_ID = (req.body.PATIENT_ID) ? req.body.PATIENT_ID : appointment.PATIENT_ID
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
//status: 0: chưa xác nhận, chưa xem, 1: đã xem, chưa xác nhận
//2: đã xác nhận
//3:đã hủy
exports.getAppointmentRequest = async (req, res) => {
    try {
        let request = await APPOINTMENTREQUEST.findAll({
            where: {
                [Op.or]:
                    [{ STATUS: 0 }, { STATUS: 1 }]
            }
        })
        console.log(request[0].PATIENT_ID)
        return res.json(request)
    } catch (error) {
        return res.status(500).send('Lỗi server')
    }

}

exports.updateAppointmentStatus = async (req, res) => {
    let id = req.params.id
    try {
        let request = await APPOINTMENTREQUEST.findOne({
            where: {
                REQUEST_ID: id
            }
        })
        if (!request)
            return res.status(409).send('Không tìm thấy yêu cầu nào!')
        if (req.body.status == 2) {
            console.log('change status to 2')
        }
        request.STATUS = (req.body.status) ? req.body.status : request.STATUS
        await request.save()
        return res.send("Update thành công")
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi server')
    }
}

exports.getDiagnosticStack = (req, res) => {
    return res.json(diagnosticStack)
}

const pushDiagnosticStack = (diagnostic, patient, room, io) => {
    if (room == 1) {
        diagnosticStack.room1.addPatientToLast(diagnostic, patient)
    }
    else {
        diagnosticStack.room2.addPatientToLast(diagnostic, patient)
    }
    io.emit('diagnostic-stack-change', diagnosticStack)
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
        return res.status(200).send('Tạo thành công!')
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
        return res.status(500).send('Lỗi sever!')
    }
}
exports.getPatientById = async (req, res) => {
    try {
        let id = req.params.id
        let patient = await PATIENT.findOne({
            where: { PATIENT_ID: id }
        })
        if (patient) {
            return res.json(patient)
        } else {
            return res.status(404).send('Không có bệnh nhân này!')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi sever!')
    }
}
exports.updatePatient = async (req, res) => {
    try {
        let id = req.params.id
        let patient = await PATIENT.findOne({
            where: { PATIENT_ID: id }
        })
        let cmnd
        let identityNumber = req.body.IDENTITY_NUMBER
        //kiem tra cmnd co ton tai chua
        const checkIdentity_number = async (condition) => {
            try {
                let oldIdentity_number = await PATIENT.findOne(condition)
                if (!oldIdentity_number) {
                    return null
                }
                return oldIdentity_number
            } catch (error) {
                console.log(error)
                throw Error
            }
        }
        try {
            cmnd = await checkIdentity_number({ where: { IDENTITY_NUMBER: identityNumber } })
        } catch (error) {
            console.log(error)
            throw Error
        }
        if (!cmnd) {
            patient.PATIENT_NAME = (req.body.PATIENT_NAME) ? req.body.PATIENT_NAME : patient.PATIENT_NAME
            patient.IDENTITY_NUMBER = (req.body.IDENTITY_NUMBER) ? req.body.IDENTITY_NUMBER : patient.IDENTITY_NUMBER
            patient.PHONE = (req.body.PHONE) ? req.body.PHONE : patient.PHONE
            patient.GENDER = (req.body.GENDER) ? req.body.GENDER : patient.GENDER
            patient.DATE_OF_BIRTH = (req.body.DATE_OF_BIRTH) ? moment(req.body.DATE_OF_BIRTH, 'DD/MM/YYYY') : patient.DATE_OF_BIRTH
            patient.ADDRESS = (req.body.ADDRESS) ? req.body.ADDRESS : patient.ADDRESS
            await patient.save()
            return res.status(200).send('Cập nhật thành công!')
        } else {
            return res.status(404).send('Số CMND đã tồn tại!')
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
    } catch (error) {
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
        let patient = await PATIENT.findOne({
            where:{
                PATIENT_ID:req.body.PATIENT_ID
            }
        })
        let diagnostic = new DIAGNOSTIC({
            PATIENT_ID: req.body.PATIENT_ID,
            CREATE_AT: moment.utc(req.body.CREATE_AT, 'DD/MM/YYYY h:mm:ss'),
            DOCTOR_ID: req.body.DOCTOR_ID,
            DIAGNOSTIC_FEE: req.body.DIAGNOSTIC_FEE
        })
        await diagnostic.save()
        let lastDiagnostic = await DIAGNOSTIC.findOne({
            where:{
                DIAGNOSTIC_ID:diagnostic.DIAGNOSTIC_ID
            },
            include:["DOCTOR", "PATIENT"]
        })
        pushDiagnosticStack(lastDiagnostic, 1, req.io)
        return res.status(200).send('Tạo phiếu khám thành công!')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi sever!')
    }
}
exports.getAllDiagnostic = async (req, res) => {
    try {
        let diagnostic = await DIAGNOSTIC.findAll({
        })
        return res.json(diagnostic)
    } catch (error) {
        return res.status(500).send('Lỗi sever!')
    }
}
exports.getDiagnosticById = async (req, res) => {
    try {
        let id = req.params.id
        let diagnostic = await DIAGNOSTIC.findOne({
            where: { DIAGNOSTIC_ID: id }
        })
        if (diagnostic) {
            return res.json(diagnostic)
        } else {
            return res.status(404).send('Không có phiếu khám để tìm!')
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi sever!')
    }
}
exports.updateDiagnostic = async (req, res) => {
    try {
        let id = req.params.id
        let diagnostic = await DIAGNOSTIC.findOne({
            where: { DIAGNOSTIC_ID: id }
        })
        if (diagnostic) {
            diagnostic.PATIENT_ID = (req.body.PATIENT_ID) ? req.body.PATIENT_ID : diagnostic.PATIENT_ID
            diagnostic.DOCTOR_ID = (req.body.DOCTOR_ID) ? req.body.DOCTOR_ID : diagnostic.DOCTOR_ID
            await diagnostic.save()
            return res.status(200).send('Cập nhật thành công!')
        } else {
            return res.status(404).send('Không có phiếu khám để sửa!')
        }
    } catch (error) {
        return res.status(500).send('Lỗi sever')
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