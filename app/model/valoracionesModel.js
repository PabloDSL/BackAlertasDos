'user strict';
var sql = require('./db.js');

var Valoracion = function(valoraciones){
    this.idIncidente = valoraciones.idIncidente;
    this.votos_positivo = valoraciones.votos_positivo;
    this.votos_negativo = valoraciones.votos_negativo;
};

Valoracion.createValoracion =  function createValoracion(newValoracion, result) {    
    sql.query("INSERT INTO valoraciones set ?", newValoracion, function (err, res) {       
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, "Registro exitoso");
            }
        });           
};
module.exports= Valoracion;