
var cheerio = require('cheerio')// equivalent à JQuery ce serveur

var request = require('request')// Permettre d'envoyer des requêtes à d'autres pages web ou sites web

var express = require('express')// Framwork pour créer un serveur



var app = express() // On crée un serveur

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.static(__dirname))

// Géstion des routes  par express

app.get('/', function (req, res) {
	res.sendFile('index.html')
})

app.get('/:url'/*route*/, function (req, res) {

	var error = {"error": true, "message": "Merci de choisir une balise"}
	res.json(error)
})



app.get('/:url/:balise', function (req, res) {

	var url = req.params.url
	var balise = req.params.balise

	url =  decodeURIComponent(url);

	request(url, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		$ = cheerio.load(body)// Show the HTML for the Google homepage.

    		// Ce tableau nous permet de stocker toutes les infos des balises 
    		var tab = []

    		// La variable balise est initialisée plus haut
    		// cheerio va s'occuper de récuperer les infos sur la balise
			$(balise).each(function(i, elem) {
				// On récupère  les infos dans un tableau objet
				var content = {}
    			for (key in elem.attribs) {
    				content[key] = elem.attribs[key];
    			}
    		
    			content.text = $(this).text()
    			content.html = $(this).html()
			  	tab[i] = content;
			});
		
			
			// Renvoie la reponse à l'utilisateur
			res.json(tab)
    	}
	})

})

app.listen(8080, function() {
	console.log('ça tourne')
})