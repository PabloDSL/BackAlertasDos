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
            }
        });           
};
module.exports= Voto_usuario;