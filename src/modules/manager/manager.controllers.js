const express = require('express')
const { sequelize , EMPLOYEE } = require('../../models')
exports.getEMPLOYEE = async (req, res) =>{
        try{
             let employee = await EMPLOYEE.findAll({
                 //raw: true,
             })
             return res.json(employee)
        }catch(e){
          return res.status(500).send('Loi sever!')
        }
}
exports.deleteEmployee = async(req,res)=>{
    try{
        let id = req.id
        let employee = EMPLOYEE.findOne({
            where: {employee_id: id}
        })
        if(employee){
            await employee.destroy()
        }
    }catch(e){  
        return res.status(500).send('Xoa khong thanh cong!')
    }
}