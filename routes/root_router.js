var express = require("express");
var root = express.Router();

root.get('/', function(req, res) {
  res.render("index", {
    nieuws: req.app.get('nieuwsFile').nieuws,
    categorieen: req.app.get('categorieenFile').categorieen
  });
});


// Route naar voorbeeld
root.get('/voorbeeld', function(req, res) {
  res.render("voorbeeld", {

  });
});

// Route naar aanmelden
root.get('/aanmelden', function(req, res) {
  res.render("aanmelden", {

  });
});

// Route naar registreren
root.get('/registreren', function(req, res) {
  res.render("registreren", {

  });
});

module.exports = root;
