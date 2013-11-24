
module.exports = function(io){

  io.sockets.on('connection', function(socket) {
    console.log("SOCKET WORKING");
    socket.emit('message', { message: 'Welcome to PhoneTag' });

    socket.on('joinGame', function(data){
      console.log("Join game clicked!");
    });

    socket.on('sendLocation', function(data){
      console.log("Received Location");
    });

    socket.on('tapPlayer', function(data){
      console.log("Tapped Player, YAY!");
      player = data.player;
      id = data.socketId;
      Players.find();
      socket(id).emit('dead', { message: "you are dead" });
    });

    socket.on('tapPlayer', function(data){
      console.log("Tapped Player, YAY!");
    });

  });

};
