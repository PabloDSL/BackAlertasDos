'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'verbateam',
    password : 'verba1234',
    database : 'alertadosbd'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;