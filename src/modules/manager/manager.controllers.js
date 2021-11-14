const { sequelize, EMPLOYEE, SERVICE } = require('../../models')
const moment = require('moment')
exports.createEmployee = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Không để ô trống"
            })
        }
        let identity_number = req.body.IDENTITY_NUMBER
        let employee = await EMPLOYEE.findOne({
            where: { IDENTITY_NUMBER: identity_number }
        })
        if (!employee) {
            let newEmployee = new EMPLOYEE({
                EMPLOYEE_NAME: req.body.EMPLOYEE_NAME,
                IDENTITY_NUMBER: req.body.IDENTITY_NUMBER,
                PHONE: req.body.PHONE,
                GENDER: req.body.GENDER,
                DATE_OF_BIRTH: moment.utc(req.body.DATE_OF_BIRTH, 'DD/MM/YYYY h:mm:ss'),
                EMPLOYEE_ADDRESS: req.body.EMPLOYEE_ADDRESS,
                POSITION: req.body.POSITION
            })
            await newEmployee.save()
        } else {
            return res.status(409).send('Số CMND đã tồn tại!')
        }
        return res.status(200).send("Tạo thành công!")
    } catch (error) {
        console.log(error)
        return res.status(500).send('Lỗi sever!')
    }
}
exports.getAllEmployee = async (req, res) => {
    try {
        let employee = await EMPLOYEE.findAll({
            //raw: true,
        })
        return res.json(employee)
    } catch (e) {
        return res.status(500).send('Lỗi sever!')
    }
}
exports.updateEmployee = async (req, res) => {
    try {
        let id = req.params.id
        let employee = await EMPLOYEE.findOne({
            where: { EMPLOYEE_ID: id }
        })
        if (employee) {
            //employee.EMPLOYEE_NAME = req.body.EMPLOYEE_NAME,
            //employee.IDENTITY_NUMBER = req.body.IDENTITY_NUMBER,
            //employee.PHONE = req.body.PHONE,
            //employee.GENDER = req.body.GENDER,
            //employee.DATE_OF_BIRTH = moment(req.body.DATE_OF_BIRTH, 'DD/MM/YYYY'),
            //employee.EMPLOYEE_ADDRESS = req.body.EMPLOYEE_ADDRESS
            employee.POSITION = req.body.POSITION
            await employee.save()
            return res.status(200).send('Cập nhật thành công!')
        }
    } catch (error) {
        return res.status(500).send('Lỗi sever!')
    }
}
exports.deleteEmployee = async (req, res) => {
    try {
        let id = req.params.id
        let employee = await EMPLOYEE.findOne({
            where: { EMPLOYEE_ID: id }
        })
        if (employee) {
            await employee.destroy()
            return res.send('Xóa thành công!')
        }
        else {
            return res.status(404).send('Không có gì để xóa!')
        }
    } catch (e) {
        console.log(e)
        return res.status(500).send('Lỗi sever!')
    }
}
exports.changeMedicalExaminationFee = async (req, res) => {
    let newFee = {
        id: req.body.id,
        fee: req.body.fee
    }
    let fee = await SERVICE.findOne({
        where: {
            SERVICE_ID: newFee.id
        }
    })
    fee.FEE = newFee.fee
    await fee.save();
    res.send(fee)
}
