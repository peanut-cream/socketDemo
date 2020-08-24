var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var request = require('request');

app.get('/abc', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message',async function(msg){
        console.log('message: ' + msg);
        // io.emit('chat message', msg);//所有客户端
        socket.broadcast.emit('chat message', msg);//除了发出人，发给所有客户端
        // request('http://api.qingyunke.com/api.php?key=free&appid=0&msg=' + msg, function (error, response, body) {
        //     if (body) { 
        //         console.log(body);
        //         let respone = JSON.parse(body);
        //         console.log(respone.content)
        //         if (respone.content) { 
        //             io.emit('chat message', "机器人："+respone.content);
        //         }
        //     }
        // });
    });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});