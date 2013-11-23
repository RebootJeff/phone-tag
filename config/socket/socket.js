
module.exports = function(io){
  io.sockets.on('connection', function(socket) {
    socket.emit('message', { message: 'Welcome to PhoneTag' });
  });
};
