'use strict';

var Incidente = require('../model/appModel.js');

exports.list_all_incidents = function(req, res) {
  Incidente.getAllIncidents(function(err, incidente) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', incidente);
    res.send(incidente);
  });
};



exports.create_a_incident = function(req, res) {
  var new_incident = new Incidente(req.body);

  //handles null error 
  
  Incidente.createIncidente(new_incident, function(err, incidente) {
    
    if (err)
      res.send(err);
    res.json(incidente);
  });

};


exports.read_a_incidente = function(req, res) {
  incidente.getIncidentById(req.params.incidenteId, function(err, incidente) {
    if (err)
      res.send(err);
    res.json(incidente);
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
  
  Usuario.createUsuario(new_user, function(err, incidente) {
    
    if (err)
      res.send(err);
    res.json(incidente);
  });

};