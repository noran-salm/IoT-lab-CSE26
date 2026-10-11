const express = require('express');
const app = express();
const PORT = 3000;

const server = app.listen(PORT,function(){
    console.log("server is running at port : "+PORT);
});

const socketserver = require('ws').WebSocketServer;
const wss = new socketserver({server});
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
res.sendFile((__dirname + '/public/index.html'));
});

let value = "0" ;
wss.on('connection',function(ws){

console.log("client is connected to server");
ws.send(value);

ws.on('message',function(msg){
    value=msg.toString();
  console.log("message recieved is : "+msg);
  broadcast(value);
});

ws.on('close',function(){
console.log("client disconnected");
});

});


function broadcast(msg){
wss.clients.forEach(function(client){

if(client.readyState == client.OPEN){
    client.send(msg);
}
else{
    console.log("client is off");
}
});
}