const express = require('express');
var app = express();
var sql = require('./app/model/db.js')
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;

//websocket
var server = app.listen(3000);
var io = require('socket.io').listen(server);

var posiciones;

// Configurar cabeceras y cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost','http://localhost:8101');
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

var routes = require('./app/routes/appRoutes'); //importing route
routes(app); //register the route

io.on('connection', function(socket) {

  console.log('Un cliente se ha conectado en '+ socket );
  console.log(socket.request.connection.remoteAddress," Connected")
  /* socket.emit('posiciones', function (result){
    sql.query("SELECT * FROM incidentes",function(err,res){
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }else{
        result(null,res)
        console.log('Respuesta : ', res)
      }
    
    });
  }); */
  /* socket.broadcast.emit('posiciones', function (result) {
    sql.query("SELECT * FROM incidentes",function(err,res){
      if(err) {
        console.log("error: ", err);
        result(null, err);
      }else{
        result(null,res)
        console.log('Respuesta : ', res)
      }
    });
  }); */

  socket.emit('marker', { latitude: '16.614629',longitude: '-93.089273' });


  socket.on('end', function() {
    
  });

  socket.on('error', function() {

  });

  socket.on('timeout', function() {
    
  });

  socket.on('close', function() {
    
  });
});
