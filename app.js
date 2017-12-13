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
          console.log(d);


          if(d.lijnen.length === 0) {
               s_d += 'Er zijn geen lijnen gevonden';
          } else {

               for(var i=0; i < d.lijnen.length; i++) {
                    lijn = d.lijnen[i]; // Eerste lijn nemen die gevonden is. In theorie kan je beter misschien over de lijnen loopen en de gebruiker de keuze geven tussen alle gevonden lijnen.

                    //console.log(lijn); // debug

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
                    // Einde datum verkrijgen
                    //Tijdelijke overschrijving datum
                    dagVanVandaag = "29-11-2017";
                    // Zoek naar lijnnummer 99 en je krijgt een omleiding te zien op deze dag


                    if (lijn.omleidingen === true) {
                         console.log("er zijn omleidingen");
                    }


                    request('https://www.delijn.be/rise-api-core/reizigersberichten/omleidingen/lijn/' + lijn.entiteitNummer + '/' + lijn.internLijnnummer + '/' + lijn.richtingCode + '/' + dagVanVandaag + '/nl', function (error, response, body) {
                         var omleidingen = JSON.parse(body);
                         
                         console.log('Status:', response.statusCode);
                         console.log('Headers:', JSON.stringify(response.headers));
                         console.log('Response:', body);

                         //console.log(omleidingen);
                         // hier kan je dan je user interface opzetten

                         /*var opmaak = '';
                         var styling = '';
                         styling += '<h3>qsdqs</h3>';*/


                         //s_d += '<p> Er zijn geen verkooppunten gevonden in de gemeente ${lijn.omschrijving}</p>';
                    }); // request

               } // for

          } //if-else


          res.render('result', {
               //verkoop: s_d,
               omleidingen: body,
               //styling: opmaak
          });
     });
});


/*request('https://www.delijn.be/rise-api-core/reisadvies/routes/{startPoint}/{endPoint}/{startX}/{startY}/{endX}/{endY}/{date}/{time}/{arrivalDeparture}/{byBus}/{byTram}/{byMetro}/{byTrain}/{byBelbus}/{language}', function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});*/

/*app.post('/test2', function(req, res) {
    //console.log(req.body.gemeente);
    var bodyElement = '';
    request('https://www.delijn.be/rise-api-core/locations/verkooppunten/' + req.body.gemeente, function (error, response, body) {
      var d = JSON.parse(body);
      console.log(d);

      if (d === null) {
        bodyElement += `
        <p> Er zijn geen verkooppunten gevonden in de gemeente ${req.body.gemeente}</p>
        `;
      }
      else {

        bodyElement += `goril
          <p> verkooppunten in de gemeente ${req.body.gemeente}</p>
        `;
        for (var i = 0; i < d.length; i++) {
          var a = d[i];
          bodyElement += `
            <p> ${a.gemeente} </p>
            <p> ${a.naam} verkoopt tickets </p>
            <p> Richting: ${a.adresString} </p>
            <hr>
          `;
        }
      }
      res.render('test2', {
        resultaat: `${bodyElement}`,
      });
    });
});*/




app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
