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


/*request('https://www.delijn.be/rise-api-core/haltes/vertrekken/{halte_id}/{num_results}', function (error, response, body) {
     //console.log('Status:', response.statusCode);
     //console.log('Headers:', JSON.stringify(response.headers));
     //console.log('Response:', body);
});*/

/*app.post('/result', function(req, res) {
    // console.log(req.body.stad);
    var s_d = ' ';
    request('https://www.delijn.be/rise-api-core/locations/verkooppunten/' + req.body.stad, function (error, response, body) {
      var d = JSON.parse(body);
      console.log(d);

      if (d === null) {
        s_d += `
        <p> Er zijn geen verkooppunten gevonden in de gemeente ${req.body.stad}</p>
        `;
      }
      else {

        s_d += `
          <h6> verkooppunten in de gemeente ${req.body.stad}</h6>
        `;
        for (var i = 0; i < d.length; i++) {
          var a = d[i];
          s_d += `
            <h6> ${a.gemeente} </h6>
            <h6> ${a.naam} verkoopt tickets </h6>
            <h6> Richting: ${a.adresString} </h6>
            <hr>
          `;
        }
      }
      res.render('result', {
        resultaat: `${s_d}`,
      });
    });
});*/


app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
