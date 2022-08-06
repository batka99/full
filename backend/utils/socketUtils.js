const socketIo = require('socket.io')




exports.sio = server =>{
    return socketIo(server, {
        transport:[polling],
        cors:{
            origin: "*"
        }
    })
}

exports.connection = io =>{
    io.on("connection", socket => {
        console.log("user is connected")

        socket.on("message", massage => {
            console.log(`message from ${socket.id} : ${massage}`)
        })
        socket.on("disconnected", ()=>{
            console.log(`socket ${socket.id} disconnected`)
        })
    })
}