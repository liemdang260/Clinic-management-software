const express = require('express')
const {createServer} = require('http')
const cors = require('cors')
const mainRouter = require('./routers/main-router')
const dotenv = require('dotenv')
const { connectDB2 } = require('./connectDB/db')
const { sequelize } = require('./models')
const socketIo = require('socket.io')

dotenv.config()

const app = express()
let server = createServer(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/', mainRouter)

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

startServer()

const io = socketIo(server, { cors: { origin: '*' } })
app.use((req, res, next) => {
    req.io = io
    return next()
})



io.on('connection',(socket)=>{
    console.log(socket.id)
    socket.on('disconnect',()=>{
        console.log(`${socket.id} is disconnected!`)
    })
    socket.on('hello',(data)=>{
        console.log(data)
    })
})

