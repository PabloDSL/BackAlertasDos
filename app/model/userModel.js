'user strict';
// Nodejs encryption with CTR
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
 let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
 let encrypted = cipher.update(text);
 encrypted = Buffer.concat([encrypted, cipher.final()]);
 return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
 let iv = Buffer.from(text.iv, 'hex');
 let encryptedText = Buffer.from(text.encryptedData, 'hex');
 let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
 let decrypted = decipher.update(encryptedText);
 decrypted = Buffer.concat([decrypted, decipher.final()]);
 return decrypted.toString();
}
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