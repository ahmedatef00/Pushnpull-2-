const express = require('express');
const socketio = require('socket.io');
let app2 =express();
const cors = require('cors');
const PORT = process.env.PORT ||4999
app2.use(express.static("public_html"));

let server=require('http').Server(app2);

app2.use(cors);
//Socket connection SEREVER call server and seee every thing 
var io= socketio(server);
//listen to the connection  and recive the data of the visitor 
io.on('connection',(visitor)=>{
console.log(visitor.id);
visitor.on('message',(message,username)=>{

    //do emmiting for all sockets clients 
    io.emit('sendtoall', message,username);
    

})

})


server.listen(PORT,(err)=>{
    if(!err)
 console.info(`SERVER IS listening on port ${PORT}`);
 
})


