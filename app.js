const express = require('express');
var app = express();
var sql = require('./app/model/db.js')
var bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var moment = require('moment');
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
console.log(moment().format('YYYY/MM/DD'))

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
    //console.log("Prueba ignore");
  }
});
io.on('connection', function(socket) {
  //socket.emit("new-incidente", incidentes);  
  console.log('Un cliente se ha conectado en '+ socket);
  socket.on('new-message', function(data) {
    console.log(data);
    incidentes.rows.push(data);
    socket.broadcast.emit('new-incidente', incidentes)
  });

  socket.on('send-valoration', function(data){
    console.log(data);
    io.sockets.emit('new-valoration');
  });

});


function dateChange (){
  while (true){
    if(moment().format('LT')=="11:59 PM"){
      sql.query("DELETE * FROM incidentes", function (err, res) {
        if(err) {
            console.log("error: ", err);
        }
        else{
         console.log("Se han borrado los registros");
        }
    }); 
    }
  }
}