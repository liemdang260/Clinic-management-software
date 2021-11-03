const express = require('express')
//const {sequelize, RECEPTION } = require('../../models')
let createNew = (data) =>{
    console.log(data)
}
exports.createReception = async(req,res)=>{
    try{
        if(!req.body){
            res.status(400).send({
                message: "Không để ô trống!" 
            })
        }
        let id = req.reception_id
        let reception = RECEPTION.findOne({
            where: {reception_id: id}
        })
        //const reception_id = await RECEPTION.findOne({where: {reception_id: reception_id}}) 
        //await createNew({body, id: reception_id})
        if(!reception){
            await createNew(req.body)
            return res.send('Đặt lịch hẹn thành công!')
        }
        else{
            return res.send('ID đã có rồi!')
        }
    }catch(e){
        return res.status(500).send('Lỗi sever!')
    }

} 
exports.getAllReception = async(req,res)=>{
        try{
            let reception = await RECEPTION.findAll({
                attributes: []
            })
            return res.json(reception)
        }catch(e){
            return res.status(500).send('Lỗi sever!')
        }
}
exports.updateReception = async(req,res)=>{
    try{
        let id = req.id
        let reception = RECEPTION.findOne({
            where: {reception_id: id}
        })
        if(reception){
            


            await reception.save()
        }
    }catch(e){
        return res.status(500).send('Lỗi sever!')
    }
}
exports.deleteReception = async(req,res)=>{
    try{
        let id = req.id
        let reception = RECEPTION.findOne({
            where: {reception_id: id}
        })
        if(reception){
            await reception.destroy()
        }
    }catch(e){
        return res.status(500).send('Lỗi sever!')
    }
}