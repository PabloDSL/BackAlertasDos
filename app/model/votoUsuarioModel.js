'user strict';
var sql = require('./db.js');

var Voto_usuario = function(Voto_usuario){
    this.idincidente = Voto_usuario.idincidente;
    this.idusuario = Voto_usuario.idusuario;
    this.megusta = Voto_usuario.megusta;
    this.nomegusta = Voto_usuario.nomegusta
};

Voto_usuario.createVoto =  function createVoto(newVoto, result) {  
    console.log(newVoto.idusuario)
    sql.query("INSERT INTO voto_usuario (idincidente,idusuario,megusta,nomegusta) VALUES ($1, $2, $3, $4)", [newVoto.idincidente,newVoto.idusuario,newVoto.megusta,newVoto.nomegusta], function (err, res) {       
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log("echo")
                result(null,"exito")
            }
        });           
};
Voto_usuario.getAllVotos =  function votos( result) {  
    sql.query("select * from voto_usuario ", function (err, res) {       
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res.rows);
            }
        });           
};

Voto_usuario.getVotoByIdIncidente = function voto(id,result){
    sql.query("select * from voto_usuario where idincidente=$1",[id] ,function (err, res) {       
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res.rows);
        }
    });   

};

Voto_usuario.totalMegusta = function (id,result){
    sql.query("select count(megusta) as likes from voto_usuario WHERE megusta = 1 and idincidente = $1", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
              result(null, err);
           }
         else{   
           result(null, res.rows);
              }
          }); 
};
Voto_usuario.totalNoMegusta = function (id,result){
    sql.query("select count(nomegusta) as dislikes from voto_usuario WHERE nomegusta = 1 and idincidente = $1", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
              result(null, err);
           }
         else{   
           result(null, res.rows);
              }
          }); 
};
module.exports= Voto_usuario;