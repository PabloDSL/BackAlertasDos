'user strict';
var sql = require('./db.js');

var Usuario = function(usuarios){
    this.usuario = usuarios.usuario;
    this.correo = usuarios.correo;
    this.contrasena = usuarios.contrasena;
};

Usuario.createUsuario =  function createUser(newUser, result) {    
    sql.query("INSERT INTO usuarios set ?", newUser, function (err, res) {       
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
module.exports= Usuario;