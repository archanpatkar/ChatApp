var express = require("express");
var io = require("socket.io")();
var app = express();


app.get("/Chat",(req,res) => {
 res.sendFile(__dirname + "/Chat.html");
});

var hserver = app.listen(8000,() => console.log("Server Started at 8000"));

io.listen(hserver);

io.on('connection',(socket) => {
 console.log("User Connected");
 socket.join("chatroom");
 socket.on('sendMessage',(payload) => io.in("chatroom").emit('message',payload));
 socket.on('disconnect',() => console.log("User Disconnected"));
});
