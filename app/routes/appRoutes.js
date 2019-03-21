'use strict';
module.exports = function(app) {
  var controlador = require('../controller/appController');

  // todoList Routes
  app.route('/incidentes')
    .get(controlador.list_all_incidents)
    .post(controlador.create_a_incident);
   
   app.route('/incidentes/:incidenteId')
    .get(controlador.read_a_incidente)
    .delete(controlador.delete_a_incidente);
    };