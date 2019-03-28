'user strict';
var sql = require('./db.js');

var Usuario = function(usuarios){
    this.usuario = usuarios.usuario;
    this.correo = usuarios.correo;
    this.contrasena = usuarios.contrasena;
    this.token = usuarios.token;
};

Usuario.createUsuario =  function createUser(newUser, result) {    
    sql.query("INSERT INTO usuarios (usuario,correo,contrasena,token) VALUES ($1, $2, $3, $4)", [newUser.usuario,newUser.correo,newUser.contrasena,newUser.token], function (err, res) {       
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
              console.log('users : ', res.rows);  

             result(null, res.rows);
            }
        });   
};

Usuario.updateById = function(id, usuario, result){
    sql.query("UPDATE usuarios SET contrasena = $1 WHERE id = $2", [usuario.contrasena, id], function (err, res) {
            if(err) {
                console.log("error: ", err);
                  result(null, err);
               }
             else{   
               result(null, res.rows);
                  }
              }); 
  };

Usuario.getUserById = function createUser(userId, result) {
    sql.query("Select * from usuarios where id = $1 ", [userId], function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res.rows);
          
            }
        });   
};
Usuario.iniciarSesion = function iniciarSesion(usuario, result){
    sql.query("Select * from usuarios where correo = $1 and  contrasena = $2", [usuario.correo,usuario.contrasena], function (err, res) {             
        if(err) {
            console.log("error: ", err);
            result("exito", "0");
        }
        else{
            result("exito", "1");
      
        }
    });   
}
module.exports= Usuario;