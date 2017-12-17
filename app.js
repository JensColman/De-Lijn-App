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


app.post('/result', function(req, res) {
     var s_d = ' ';
     request('https://www.delijn.be/rise-api-search/search/quicksearch/' + req.body.lijnnummer, function (error, response, body) {
          var d = JSON.parse(body);
          //console.log(d);

          if(d.lijnen.length === 0) {
               s_d += 'Er zijn geen lijnen gevonden';
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


                    request('https://www.delijn.be/rise-api-core/reizigersberichten/omleidingen/lijn/' + lijn.entiteitNummer + '/' + lijn.internLijnnummer + '/' + lijn.richtingCode + '/' + dagVanVandaag + '/nl', function (error, response, body) {
                         var omleidingen = JSON.parse(body);

                         if (omleidingen.omleidingList.length === 0) {
                              console.log("geen omleidingen gevonden");
                              s_d += "Geen omleidingen";
                         } else {
                              console.log(omleidingen.omleidingList[0].omleiding);
                              s_d += omleidingen.omleidingList[0].omleiding;
                         }

                    });

               }

          }


          res.render('result', {
               omleidingen: body,
          });
     });
});


app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
