'user strict';
var sql = require('./db.js');

//Task object constructor
var Incidente = function(incidentes){
    this.titulo = incidentes.titulo;
    this.descripcion = incidentes.descripcion;
    this.tipoCorteCirculacion = incidentes.tipoCorteCirculacion;
    this.latitud = incidentes.latitud;
    this.longitud = incidentes.longitud;
    this.fecha = incidentes.fecha;
    this.hora = incidentes.hora;
};
Incidente.createIncidente = function createUser(newIncident, result) {    
        sql.query("INSERT INTO incidentes set ?", newIncident, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
Incidente.getIncidentById = function createUser(incidentId, result) {
        sql.query("Select * from incidentes where id = ? ", incidentId, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Incidente.getAllIncidents = function getAllIncidents(result) {
        sql.query("Select * from incidentes", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('tasks : ', res);  

                 result(null, res);
                }
            });   
};

Incidente.remove = function(id, result){
     sql.query("DELETE FROM incidentes WHERE id = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Incidente;