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
  app.route('/incidentesLikes/:id').put(controlador.update_likes_incidente);
  app.route('/register').post(controlador.create_a_user);
  app.route('/usuarios').get(controlador.list_all_users);
  app.route('/usuarios/:id')
    .get(controlador.read_a_user)
    .put(controlador.update_a_user);


  app.route('/voto').post(controlador.create_a_voto)
  .get(controlador.get_all_votos);

  app.route('/voto/:id').get(controlador.get_voto_by_idIncidente);

  app.route('/login').post(controlador.iniciar_sesion);

  app.route('/totalikes/:id').get(controlador.total_megusta);
  app.route('/totaldislikes/:id').get(controlador.total_nomegusta);
    

};