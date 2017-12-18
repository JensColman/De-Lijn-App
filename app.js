const rp = require('request-promise-native');
const path = require("path");

const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'));

app.use(require("./routes/root_router"));

app.post('/storingenResult', (req, res) => {
	rp({
		method: "GET",
		url: 'https://www.delijn.be/rise-api-search/search/quicksearch/' + req.body.lijnnummer,
		json: true
	})
		.then(body => {
			if (body.lijnen.length === 0) {
				return Promise.resolve('Er zijn geen lijnen gevonden');
			} else {
				return Promise.all(body.lijnen.map(lijn => new Promise(resolve => {
					// Datum verkrijgen
					let dagVanVandaag = new Date();
					let dd = dagVanVandaag.getDate();
					let mm = dagVanVandaag.getMonth() + 1; //Januari is 0!
					const yyyy = dagVanVandaag.getFullYear();

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
					resolve(rp({
						method: "GET",
						url: 'https://www.delijn.be/rise-api-core/reizigersberichten/omleidingen/lijn/' + lijn.entiteitNummer + '/' + lijn.internLijnnummer + '/' + lijn.richtingCode + '/' + dagVanVandaag + '/nl',
						json: true
					}));
				})));
			}
		})
		.then(omleidingsRequests => {
				let tmp = "";
				omleidingsRequests
					.map(omleidingsInfo => {
						let lijn;
						if (omleidingsInfo.geenOmleidingen) {
							lijn = 'Er zijn geen omleidingen gevonden';
							lijn += `<br />`;

						} else {
							// console.log(omleidingen.omleidingList[0].omleiding);
							lijn = omleidingsInfo.omleidingList[0].omleiding;
							lijn += `<br />`;
						}
						return lijn;
					})
					.forEach(lijn => tmp += lijn);
				return Promise.resolve(tmp);
			}
		)
		.catch(err => data = `An error occurred! :'(<br />${err}`)
		.then(data => res.render('storingenResult', {
			omleidingenLijst: `${data}`,
		}));
});

app.listen(app.get('port'), function () {
	console.log('Node luistert op poort', app.get('port'));
});
