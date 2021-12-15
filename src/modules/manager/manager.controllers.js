const { sequelize, EMPLOYEE, SERVICE, ACCOUNT } = require('../../models')
const {enCryptPassword} = require('../authentication/authentication.methods')
const moment = require('moment')
exports.createEmployee = async (req, res) => {
    console.log(req.body)
    try {
        let employee = new EMPLOYEE({
            EMPLOYEE_NAME: req.body.EMPLOYEE_NAME,
            IDENTITY_NUMBER:req.body.IDENTITY_NUMBER,
            PHONE:req.body.PHONE,
            GENDER: req.body.GENDER,
            DATE_OF_BIRTH:req.body.DATE_OF_BIRTH,
            EMPLOYEE_ADDRESS: req.body.EMPLOYEE_ADDRESS,
            POSITION:req.body.POSITION,
            START_WORK_DATE:req.body.START_WORK_DATE,
            SALARY: req.body.SALARY

        })
        await employee.save()

        let account = new ACCOUNT({
            EMPLOYEE_ID: employee.EMPLOYEE_ID,
            USERNAME:req.body.USERNAME,
            PASSWORD: enCryptPassword(req.body.PASSWORD),
            ISACTIVE: true,
            ROLE: req.body.POSITION
        })

        await account.save()
        return res.send('Tạo nhân viên thành công')
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
exports.getEmployeeById = async (req, res) => {
    try {
        let id = req.params.id
        let employee = await EMPLOYEE.findOne({
            where: { EMPLOYEE_ID: id }
        })
        if (employee) {
            return res.json(employee)
        } else {
            return res.status(404).send('Không có nhân viên này!')
        }
    } catch (error) {
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
            employee.EMPLOYEE_NAME = (req.body.EMPLOYEE_NAME) ? req.body.EMPLOYEE_NAME : employee.EMPLOYEE_NAME
            employee.IDENTITY_NUMBER = (req.body.IDENTITY_NUMBER) ? req.body.IDENTITY_NUMBER : employee.IDENTITY_NUMBER
            employee.PHONE = (req.body.PHONE) ? req.body.PHONE : employee.PHONE
            employee.GENDER = (req.body.GENDER) ? req.body.GENDER : employee.GENDER
            employee.DATE_OF_BIRTH = (req.body.DATE_OF_BIRTH) ? moment(req.body.DATE_OF_BIRTH, 'DD/MM/YYYY') : employee.DATE_OF_BIRTH
            employee.EMPLOYEE_ADDRESS = (req.body.EMPLOYEE_ADDRESS) ? req.body.EMPLOYEE_ADDRESS : employee.EMPLOYEE_ADDRESS
            employee.POSITION = (req.body.POSITION) ? req.body.POSITION : employee.POSITION
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
exports.createService = async (req,res)=>{
    try {
        let service = new SERVICE({
            SERVICE_NAME:req.body.name,
            FEE:req.body.fee
        })
        await service.save()
        return res.json('Thêm thành công')
    } catch (error) {
        console.log(error)
        return res.status(500).json('Lỗi server')
    }
}

exports.getAllService = async (req,res)=>{
    try {
        let service = await SERVICE.findAll()
        return res.json(service)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Lỗi server')
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
