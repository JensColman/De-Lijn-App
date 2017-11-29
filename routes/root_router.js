var express = require("express");
var root = express.Router();

root.get('/', function(req, res) {
  res.render("index", {
       page_name: "index"
  });
});

// Route naar aanmelden
root.get('/aanmelden', function(req, res) {
  res.render("aanmelden", {
       page_name: "aanmelden"
  });
});

// Route naar registreren
root.get('/favorieten', function(req, res) {
  res.render("favorieten", {
       page_name: "favorieten"
  });
});

// Route naar home
root.get('/home', function(req, res) {
  res.render("home", {
       page_name: "home"
  });
});

// Route naar instellingen
root.get('/instellingen', function(req, res) {
  res.render("instellingen", {
       page_name: "instellingen"
  });
});

// Route naar regiGelukt
root.get('/regiGelukt', function(req, res) {
  res.render("regiGelukt", {
       page_name: "regiGelukt"
  });
});

// Route naar registreren
root.get('/registreren', function(req, res) {
  res.render("registreren", {
       page_name: "registreren"
  });
});

// Route naar routeplanner
root.get('/routeplanner', function(req, res) {
  res.render("routeplanner", {
       page_name: "routeplanner"
  });
});

// Route naar storingen
root.get('/storingen', function(req, res) {
  res.render("storingen", {
       page_name: "storingen"
  });
});

// Route naar suggesties
root.get('/suggesties', function(req, res) {
  res.render("suggesties", {
       page_name: "suggesties"
  });
});

// Route naar voorbeeld
root.get('/voorbeeld', function(req, res) {
  res.render("voorbeeld", {
       page_name: "voorbeeld"
  });
});

// Route naar test1
root.get('/test1', function(req, res) {
  res.render("test1", {
       page_name: "test1"
  });
});

// Route naar test2
root.get('/test2', function(req, res) {
  res.render("test2", {
       page_name: "test2"
  });
});

module.exports = root;
