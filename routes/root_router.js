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

module.exports = root;
