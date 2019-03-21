let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);


let HOST = '127.0.0.1';
let PORT = 1002;
server.listen(1002);

app.get('/', (req, res) => res.send('Hello World!'))

io.on('connection', function (socket) {
    socket.on('get', function (data) {
        console.log(data);
        socket.emit('message', { message: data.message });
    })
    socket.on('disconnect', function () {
        console.log("Servidor desconectado")
    })

});

io.on('error', function (err) {
    console.error(err)
});