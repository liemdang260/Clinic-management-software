const express = require('express')
const mainRouter = require('./routers/main-router')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',mainRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT,(req,res)=>{
    console.log(`APP RUNNING AT PORT ${PORT}`)
})
