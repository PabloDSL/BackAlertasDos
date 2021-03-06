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
    this.megusta = incidentes.megusta;
    this.nomegusta = incidentes.nomegusta
};


Incidente.createIncidente = function createUser(newIncident, result) {
    let jsonValoracion = null;    
    sql.query('INSERT INTO incidentes (titulo, descripcion, tipoCorteCirculacion, latitud, longitud, fecha, hora,megusta, nomegusta) VALUES ($1, $2, $3, $4, $5, $6, $7,$8,$9)', [newIncident.titulo, newIncident.descripcion, newIncident.tipoCorteCirculacion, newIncident.latitud, newIncident.longitud, newIncident.fecha, newIncident.hora,newIncident.megusta,newIncident.nomegusta], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
    })  
    sql.query("SELECT MAX(id) FROM incidentes;",function(err,res){
        if(err){
            console.log("erro: ",err)
        }else{
            result(null,res)
        }
    }) 
};

Incidente.updateLikes = function (id,incidente,result){
    sql.query("UPDATE incidentes SET megusta = $1,nomegusta = $2  WHERE id = $3", [incidente.megusta,incidente.nomegusta, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
              result(null, err);
           }
         else{   
           result(null, res.rows);
              }
          }); 
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
        sql.query("Select * from incidentes order by id desc", function (err, res) {

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