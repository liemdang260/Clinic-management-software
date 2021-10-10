const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
 const {connectDB2} = require('../../connectDB/db')
exports.handleLogin = (req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    //  connectDB2.findOne({
    //      users: username,
    //      passwords: password
    //  })
    //  .then(data=>{
    //      if(data){
    //         let token = jwt.sign({
    //              _id: data._id},'mk')
    //          return res.status(200).json({
    //              message: 'dang nhap thanh cong',
    //              token: token
    //          })
    //      }else{
    //         return res.status(400).json('dang nhap that bai')
    //      }
    //  })
    //  .catch(err=>{
    //      res.status(500).json(`loi sever`)
    //  })
    console.log(username,password)
}