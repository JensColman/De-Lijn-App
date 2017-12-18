var express = require("express");
var categorieen = express.Router();

categorieen.get('/categorieen/:id', function(req, res) {
  res.render("categorie", {
      id: Number(req.params.id),
      items: req.app.get('nieuwsFile').nieuws,
      categorieen: req.app.get('categorieenFile').categorieen
  });
});

module.exports = categorieen;
