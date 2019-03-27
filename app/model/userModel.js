'user strict';
var sql = require('./db.js');

var Usuario = function(usuarios){
    this.usuario = usuarios.usuario;
    this.correo = usuarios.correo;
    this.contrasena = usuarios.contrasena;
    this.token = usuarios.token;
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

Usuario.getAllUsers = function getAllUsers(result) {
    sql.query("select * from usuarios", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('users : ', res);  

             result(null, res);
            }
        });   
};

Usuario.updateById = function(id, usuario, result){
    sql.query("UPDATE usuarios SET contrasena = ? WHERE id = ?", [usuario.contrasena, id], function (err, res) {
            if(err) {
                console.log("error: ", err);
                  result(null, err);
               }
             else{   
               result(null, res);
                  }
              }); 
  };

Usuario.getUserById = function createUser(userId, result) {
    sql.query("Select * from usuarios where id = ? ", userId, function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};
module.exports= Usuario;