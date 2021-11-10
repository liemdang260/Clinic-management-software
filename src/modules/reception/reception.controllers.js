const express = require('express')
const { sequelize, APPOINTMENT } = require('../../models')
exports.createAppointment = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Không để ô trống!"
            })
        }
        let id = req.body.PATIENT_ID
        let patient = PATIENT.findOne({
            where:{PATIENT_ID: id}
        })
        if (!patient){
                patient = new patient({
                 PATIENT_ID: req.body.PATIENT_ID,
                 PATIENT_NAME: req.boy.PATIENT_NAME,
                 IDENTITY_NUMBER: req.body.IDENTITY_NUMBER,
                 PHONE: req.body.PHONE,
                 GENDER: req.body.GENDER,
                 DATE_OF_BIRTH: req.body.DATE_OF_BIRTH,
                 ADDRESS: req.body.ADDRESS,
                })
                patient.save()
                appointment = new appointment({
                    APPOINTMENT_ID: req.patient.APPOINTMENT_ID,
                    PATIENT_ID: req.patient.PATIENT_ID,
                    DOCTOR_ID: req.patient.DOCTOR_ID,
                    TIMES: req.patient.TIMES,
                })
                appointment.save()
            return res.status(200).send('Đã thêm khách hàng và lịch hẹn thành công!')
        }
        else {
            appointment = new appointment({
                APPOINTMENT_ID: req.body.APPOINTMENT_ID,
                PATIENT_ID: req.body.PATIENT_ID,
                DOCTOR_ID: req.body.DOCTOR_ID,
                TIMES: req.body.TIMES,
            })
            appointment.save()
            return res.status(200).send('Đã thêm lịch hẹn thành công!')
        }
    } catch (e) {
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