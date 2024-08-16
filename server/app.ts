import express from 'express'
import {Server} from 'socket.io'
import {createServer} from 'http'


const PORT = 3000


const app =express()

const server = createServer(app);
const io= new Server(server,{
    cors:{
        origin:'*',
        methods:["GET","POST"],
        credentials:true
    }
})

app.get("/",(req,res)=>{
    res.send("Welcome chat")
})

io.on("connection",(socket: { id: any,emit:any,broadcast:any,on:any })=>{

    console.log("user connected",socket.id)
    // socket.emit("Welcome",`Welcome to server :: ${socket.id}`)
    // socket.broadcast.emit("Welcome",`${socket.id} joined the server`)
    socket.on("message",({message,room}: any)=>{
       console.log(message)
    //    io.emit("receive-message",data)
    io.to(room ).emit("receive-message",message)
    })

    socket.on("disconnect",()=>{
       console.log("User disconnected ",socket.id)
    })
})




server.listen(3000,()=>{
    console.log(`app is listening on port ${PORT}`)
})