var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};

app.get('/', function(req, res){
  res.sendFile('C:\\Users\\my199\\OneDrive\\Desktop\\Personal\\Chat' + '/index.html');
});

io.on('connection', function(socket){
  io.emit('chat message', '[user has connected]')
  socket.on('disconnect', function(){
    io.emit('chat message', '[user has disconnected]')
  });
  socket.on('chat message', function(message){
  	if (message.name == "") {
  		users[socket.id] = "Anonymous";
  	} else {
  		users[socket.id] = message.name;
  	}
    io.emit('chat message', users[socket.id] + " : " + message.msg);
  });
});



http.listen(3000, function(){
  console.log('listening on *:3000');
});
    