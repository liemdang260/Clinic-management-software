const express = require('express')
const sequelize = require('sequelize')
const mainRouter = require('./routers/main-router')
const dotenv = require('dotenv')
const {connectDB2} = require('./connectDB/db')
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',mainRouter)
app.use('/login',mainRouter)
connectDB2((err,result)=>{
   console.log(err,result);
});

const PORT = process.env.PORT || 8080
app.listen(PORT,(req,res)=>{
    console.log(`APP RUNNING AT PORT ${PORT}`)
})
