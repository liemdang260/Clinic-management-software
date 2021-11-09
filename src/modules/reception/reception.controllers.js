const express = require('express')
const { sequelize, APPOINTMENT } = require('../../models')
exports.createReception = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Không để ô trống!"
            })
        }
        let id = req.body.PATIENT_ID
        let reception = DIAGNOSTIC.findOne({
            where: { PATIENT_ID: id }
        })
        if (!reception) {
            reception = new reception({
                DIAGNOSTIC_ID: req.body.DIAGNOSTIC_ID,
                CREATE_AT: req.body.CREATE_AT,
                PATIENT_ID: req.body.PATIENT_ID,
                DOCTOR_ID: req.body.DOCTOR_ID,
                SYMPTOM: req.body.SYMPTOM,
                PRESCRIPTION: req.body.PRESCRIPTION,
                DIAGNOSTIC_FEE: req.body.DIAGNOSTIC_FEE,
                RE_EXAMINATION: req.body.RE_EXAMINATION
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
        let reception = await APPOINTMENT.findOne({
            where: { APPOINTMENT_ID: id }
        })
        console.log(req.body.DOCTOR_ID)
        if (reception) {
            reception.DOCTOR_ID = req.body.DOCTOR_ID
            reception.TIMES = new Date(req.body.TIMES)
            //new Date(req.body.TIMES)
            reception.PATIENT_ID = req.body.PATIENT_ID
            await reception.save()
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
        let reception = await APPOINTMENT.findOne({
            where: { APPOINTMENT_ID: id }
        })
        if (reception) {
            await reception.destroy()
            return res.send('Xóa thành công!')
        }
        else {
            return res.status(404).send('Không có gì để xóa!')
        }
    } catch (e) {
        return res.status(500).send('Lỗi sever!')
    }
}