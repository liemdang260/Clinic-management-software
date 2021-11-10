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
        let reception = APPOINTMENT.findOne({
            where: { PATIENT_ID: id }
        })
        if (!reception) {
            reception = new reception({
                DIAGNOSTIC_ID: req.body.DIAGNOSTIC_ID,
                PATIENT_ID: req.body.PATIENT_ID,
                DOCTOR_ID: req.body.DOCTOR_ID,
                TIMES: req.body.TIMES,
            })
            reception.save()
        }
        else {
            return res.send('ID đã có rồi!')

        }
    } catch (e) {
        return res.status(500).send('Lỗi sever!')
    }
}
exports.getAllAppointment = async (req, res) => {
    try {
        let reception = await APPOINTMENT.findAll({
            //attributes: []
        })
        return res.json(reception)
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