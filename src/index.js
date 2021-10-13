const express = require('express')
const mainRouter = require('./routers/main-router')
const dotenv = require('dotenv')
const { connectDB2 } = require('./connectDB/db')
const { sequelize } = require('./models')
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', mainRouter)

const startServer = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connected!')
        const PORT = process.env.PORT || 8080
        app.listen(PORT, (req, res) => {
            console.log(`APP RUNNING AT PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()
