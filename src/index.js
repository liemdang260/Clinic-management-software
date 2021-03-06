const express = require('express')
const { createServer } = require('http')
const cors = require('cors')
const mainRouter = require('./routers/main-router')
const dotenv = require('dotenv')
const { connectDB2 } = require('./connectDB/db')
const { sequelize } = require('./models')
const socket = require('./services/socket.io')

dotenv.config()

const app = express()
let server = createServer(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


const startServer = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connected!')
        const PORT = process.env.PORT || 8080
        server.listen(PORT, (req, res) => {
            console.log(`APP RUNNING AT PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

startServer().then(() => {
    socket.init(server)

    app.use((req, res, next) => {
        req.io = socket.io()
        return next()
    })
    app.use('/', mainRouter)
})


