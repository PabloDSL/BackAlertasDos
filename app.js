const express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

//websocket
var server = require('http').Server(app);
var io = require('socket.io')(server);

const mysql = require('mysql');
// connection configurations
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'alertadosbd'
  });


var posiciones=[];
// connect to database
connection.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route

io.on('connection', function(socket) {
	console.log('Un cliente se ha conectado en '+ socket );
  socket.emit('posiciones', messages);
  
  socket.on('new-message', function(data) {
    posiciones.push(data);

    io.sockets.emit('posiciones', messages);
  });
});

