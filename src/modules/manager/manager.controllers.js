const { sequelize , EMPLOYEE, SERVICE } = require('../../models')
exports.getEMPLOYEE = async (req, res) =>{
        try{
             let employee = await EMPLOYEE.findAll({
                 //raw: true,
             })
             return res.json(employee)
        }catch(e){
          return res.status(500).send('Lỗi sever!')
        }
}
exports.deleteEmployee = async(req,res)=>{
    try{
        let id = req.params.id
        let employee = await EMPLOYEE.findOne({
            where: {EMPLOYEE_ID: id}
        })
        if(employee){
            await employee.destroy()
            return res.send('Xóa thành công!')
        }
        else{
            return res.status(404).send('Không có gì để xóa!')
        }
    }catch(e){  console.log(e)
        return res.status(500).send('Lỗi sever!')
    }
}

exports.changeMedicalExaminationFee = async (req,res)=>{
    let newFee = {
        id:req.body.EMPLOYEE_ID,
        fee:req.body.fee
    }
    let fee = await SERVICE.findOne({
        where:{
            SERVICE_ID:newFee.id
        }
    })
    fee.FEE = newFee.fee
    await fee.save();
    res.send(fee)
}
