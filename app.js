var express = require("express");
var path = require("path");
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'));

app.use(require("./routes/root_router"));


app.post('/storingenResult', function(req, res) {
     var htmlInput = '';
     request('https://www.delijn.be/rise-api-search/search/quicksearch/' + req.body.lijnnummer, function (error, response, body) {
          var d = JSON.parse(body);
          //console.log(d);

          if(d.lijnen.length === 0) {
               htmlInput += 'Er zijn geen lijnen gevonden';
          } else {

               for(var i=0; i < d.lijnen.length; i++) {
                    lijn = d.lijnen[i];

                    // Datum verkrijgen
                    var dagVanVandaag = new Date();
                    var dd = dagVanVandaag.getDate();
                    var mm = dagVanVandaag.getMonth() + 1; //Januari is 0!
                    var yyyy = dagVanVandaag.getFullYear();

                    if (dd < 10) {
                         dd = '0' + dd;
                    }

                    if (mm < 10) {
                         mm = '0' + mm;
                    }

                    dagVanVandaag = dd + '-' + mm + '-' + yyyy;

                    //Tijdelijke overschrijving datum
                    dagVanVandaag = "29-11-2017";
                    // Zoek naar lijnnummer 99 en je krijgt een omleiding te zien op deze dag


                    // var geenOmleidingen = false;

                    request('https://www.delijn.be/rise-api-core/reizigersberichten/omleidingen/lijn/' + lijn.entiteitNummer + '/' + lijn.internLijnnummer + '/' + lijn.richtingCode + '/' + dagVanVandaag + '/nl', function (error, response, body) {
                         var omleidingen = JSON.parse(body);

                         // Hier loopt het fout, deze if functie werkt niet
                         if (omleidingen.omleidingList.length === 0) {
                              console.log("geen omleidingen gevonden");
                              htmlInput += 'Er zijn geen omleidingen gevonden';
                              htmlInput += `<br />`;
                              //geenOmleidingen = false;

                         } else {
                              console.log(omleidingen.omleidingList[0].omleiding);
                              htmlInput += omleidingen.omleidingList[0].omleiding;
                              htmlInput += `<br />`;
                              htmlInput += '${omleidingen.omleidingList[0].omleiding}';
                              htmlInput += `<br />`;
                              //geenOmleidingen = true;
                         }

                    });

                    // if (geenOmleidingen === true) {
                    //      htmlInput += 'Er zijn geen omleidingen gevonden';
                    //      htmlInput += `<br />`;
                    // } else {
                    //      htmlInput += 'Er zijn omleidingen gevonden';
                    //      htmlInput += `<br />`;
                    // }

                    // Dit geeft aan dat de omleidingen worden geschreven in de html, het juiste aantal maar niet gespecifieerd
                    htmlInput += 'Er zijn geen omleidingen gevonden';
                    htmlInput += '<br />';

               }

          }


          res.render('storingenResult', {
               //omleidingen: body,
               omleidingenLijst: `${htmlInput}`,
          });
     });
});


app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
