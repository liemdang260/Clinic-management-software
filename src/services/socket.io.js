const socketIo = require('socket.io')
// const stack = require('src/static/stack')
let io = null

exports.io = () => {
    return io
}

exports.init = (server) => {
    io = socketIo(server, { cors: { origin: '*' } })
    io.on('connection', (socket) => {
        console.log(socket.id)
        socket.on('disconnect', () => {
            console.log(`${socket.id} is disconnected!`)
        })
        socket.on('hello', (data) => {
            console.log(data)
        })
        socket.on('start', (data) => {
            console.log(data)
        })
    })

    return io
}
