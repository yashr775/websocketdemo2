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

io.on("connection",(socket: { id: any })=>{

    console.log("user connected")
    console.log("ID : ",socket.id)

})


server.listen(3000,()=>{
    console.log(`app is listening on port ${PORT}`)
})