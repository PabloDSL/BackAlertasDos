'user strict';
var sql = require('./db.js');
var moment = require('moment');

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
    let jsonValoracion = null;    
    sql.query('INSERT INTO incidentes (titulo, descripcion, tipoCorteCirculacion, latitud, longitud, fecha, hora) VALUES ($1, $2, $3, $4, $5, $6, $7)', [newIncident.titulo, newIncident.descripcion, newIncident.tipoCorteCirculacion, newIncident.latitud, newIncident.longitud, newIncident.fecha, newIncident.hora], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    })  
};


Incidente.getIncidentById = function createUser(incidentId, result) {
    console.log(incidentId)

        sql.query("Select * from incidentes where id = $1 ", [incidentId], function (err, res) {             
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
    let time = moment().format('YYYY-MM-DD')
    sql.query("Select * from incidentes where fecha = $1",[time], function (err, res) {
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
     sql.query("DELETE FROM incidentes WHERE id = $1", [id], function (err, res) {

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