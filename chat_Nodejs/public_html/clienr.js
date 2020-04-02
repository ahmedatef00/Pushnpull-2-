
//From CDN So we can have the data from the connection when we requested the localhost every tome ;


var socket = io.connect('http://localhost:5000');

var username  = document.getElementById('username');
var message   = document.getElementById('message');
var send 	  = document.getElementById('send');
var chat 	  = document.getElementById('chat');


send.addEventListener('click',()=>{

socket.emit('mesage',{
    username:username.value,
    message:message.value,
});

})


socket.on('sendtoall',(data)=>{
    chat.innerHTML += '<div class="container"><strong>'+data.username+':</strong>'+data.message+'</div>';

})