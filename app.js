const express = require('express');
var app = express();
var sql = require('./app/model/db.js')
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

//websocket
var server = app.listen(3000);
var io = require('socket.io').listen(server);

// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials',true)
	next();
});

app.listen(port);

console.log('API server started on: ' + port);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var incidentes;
var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route

sql.query("select * from incidentes", function (err, res) {
  if(err) {
      console.log("error: ", err);
  }
  else{
    incidentes = res;
    //console.log('users : ', incidentes);
  }
});
io.on('connection', function(socket) {
  socket.emit("new-message", incidentes)
  console.log('Un cliente se ha conectado en '+ socket );
  console.log(socket.request.connection.remoteAddress," Connected")
  socket.on('new-message', function(data) {
    incidentes.push(data);
    socket.broadcast.emit('posiciones', incidentes)
  });
});
