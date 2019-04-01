'use strict';

var Incidente = require('../model/appModel.js');

exports.list_all_incidents = function(req, res) {
  Incidente.getAllIncidents(function(err, incidente) {

    console.log('controller')
    if (err)
      res.send(err);
      //console.log('res', incidente);
    res.send(incidente.rows);
  });
};



exports.create_a_incident = function(req, res) {
  var new_incident = new Incidente(req.body);
  
  Incidente.createIncidente(new_incident, function(err, incidente) {
    if (err)
      res.send(err);
    res.send(incidente.rows)
  });

};


exports.read_a_incidente = function(req, res) {
  Incidente.getIncidentById(req.params.incidenteId, function(err, incidente) {
    if (err)
      res.send(err);
    res.json(incidente.rows);
  });
};



exports.delete_a_incidente = function(req, res) {

  incidente.remove( req.params.incidenteId, function(err, incidente) {
    if (err)
      res.send(err);
    res.json({ message: 'incidente successfully deleted' });
  });
};

var Usuario = require('../model/userModel.js');

exports.create_a_user = function(req, res) {
  var new_user = new Usuario(req.body);

  //handles null error 
  
  Usuario.createUsuario(new_user, function(err, usuario) {
    
    if (err)
      res.send(err);
    res.json({message: "exito"});
  });

};

exports.read_a_user = function(req, res) {
  Usuario.getUserById(req.params.id, function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);
  });
};

exports.update_a_user = function(req, res) {
  Usuario.updateById(req.params.id, new Usuario(req.body), function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);
  });
};

exports.list_all_users = function(req, res) {
  Usuario.getAllUsers(function(err, usuario) {
    if (err)
      //res.send(err);
      //console.log('res', usuario);
    res.json(usuario);
  });
};

exports.iniciar_sesion = function(req, res) {
  Usuario.iniciarSesion(new Usuario(req.body),function(err, usuario) {
    if (err)
      res.send(err);
    res.json(usuario);
  });
};

var Voto_usuario = require('../model/votoUsuarioModel.js');

exports.create_a_voto = function(req, res) {
  var new_voto = new Voto_usuario(req.body);

  //handles null error 
  
  Voto_usuario.createVoto(new_voto, function(err, usuario) {
    
    if (err)
      res.send(err);
    res.json({message:"exito"});
  });

};

exports.total_megusta = function(req, res) {
  
  Voto_usuario.totalMegusta(req.params.id, function(err, voto) {
    
    if (err)
      res.send(err);
    res.json(voto);
  });

};

exports.total_nomegusta = function(req, res) {
  
  Voto_usuario.totalNoMegusta(req.params.id, function(err, voto) {
    
    if (err)
      res.send(err);
    res.json(voto);
  });

};

exports.get_all_votos = function(req, res) {
  
  Voto_usuario.getAllVotos(function(err, voto) {
    
    if (err)
      res.send(err);
    res.json(voto);
  });

};


