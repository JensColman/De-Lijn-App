var express = require("express");
var root = express.Router();

root.get('/', function(req, res) {
  res.render("index", {

  });
});

// Route naar aanmelden
root.get('/aanmelden', function(req, res) {
  res.render("aanmelden", {

  });
});

// Route naar registreren
root.get('/favorieten', function(req, res) {
  res.render("favorieten", {

  });
});

// Route naar home
root.get('/home', function(req, res) {
  res.render("home", {

  });
});

// Route naar instellingen
root.get('/instellingen', function(req, res) {
  res.render("instellingen", {

  });
});

// Route naar regiGelukt
root.get('/regiGelukt', function(req, res) {
  res.render("regiGelukt", {

  });
});

// Route naar registreren
root.get('/registreren', function(req, res) {
  res.render("registreren", {

  });
});

// Route naar routeplanner
root.get('/routeplanner', function(req, res) {
  res.render("routeplanner", {

  });
});

// Route naar storingen
root.get('/storingen', function(req, res) {
  res.render("storingen", {

  });
});

// Route naar suggesties
root.get('/suggesties', function(req, res) {
  res.render("suggesties", {

  });
});

module.exports = root;
