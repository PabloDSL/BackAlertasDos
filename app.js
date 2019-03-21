const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;


const mysql = require('mysql');
// connection configurations
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'verbateam',
    password : 'verba1234',
    database : 'alertadosbd'
  });
 
// connect to database
connection.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route
/*let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);


let HOST = '127.0.0.1';
let PORT = 1002;
server.listen(1002);

app.get('/', (req, res) => res.send('Hello World!'))
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'verbateam',
  password : 'verba1234',
  database : 'alertadosbd'
});

connection.connect();

connection.query('SELECT * from incidentes', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0]);
});

connection.end();

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
    console.error("error: ",err)
});*/