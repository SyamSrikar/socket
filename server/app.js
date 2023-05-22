const express=require('express')
const app = express();
const http=require('http');
const {Server} = require('socket.io')
const server= http.createServer(app)
const io =new Server(server,{cors:{origin:'http://localhost:3000/',methods:["GET","POST"]}})
const cors = require('cors')
app.use(cors())


io.on('connection',(socket)=>{
    console.log("connection id",socket.id);
    socket.on("send_message",(data)=>{
        console.log(data)
        socket.broadcast.emit("receive_message",data)
    })
})

server.listen(8000, ()=>{
    console.log("listening")
})
