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


app.get('/download/:url/id/:balise', function (req, res) {
    var url = req.params.url
    var balise = "#" + req.params.balise
    url = decodeURIComponent(url)
    url = getEntireURI(url)
    console.log(url);
    console.log("balise ==>>", balise)
    request(url, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	    $ = cheerio.load(body)// Show the HTML for the Google homepage.
	    console.log($(balise))
    	    var tab = "attribute,text,html\n"
	    $(balise).each(function(i, elem) {
		var content = ""
    		for (key in elem.attribs) {
		    var str = (elem.attribs[key]).replace(/\s{2,}/g, " ");
    		    content = content + key + "='" + str + "'/"
    		}
    		content = content + "," + $(this).text() + ","
    		content = content + $(this).html() + ","
		tab = tab + content + "\n"
	    })
		console.log(tab)
		res.send(tab)
	}
	else {
	    console.log("Error received")
	    console.log(error)
	}
    })
    console.log("end")
})


app.get('/download/:url/class/:balise', function (req, res) {
    var url = req.params.url
    var balise = "." + req.params.balise
    url = decodeURIComponent(url)
    url = getEntireURI(url)
    console.log(url);
    console.log("balise ==>>", balise)
    request(url, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	    $ = cheerio.load(body)// Show the HTML for the Google homepage.
	    console.log($(balise))
    	    var tab = "attribute,text,html\n"
	    $(balise).each(function(i, elem) {
		var content = ""
    		for (key in elem.attribs) {
    		    content = content + key + "='" + elem.attribs[key] + "'/"
    		}
    		content = content + "," + $(this).text() + ","
    		content = content + $(this).html() + ","
		tab = tab + content + "\n"
	    })
		console.log(tab)
		res.send(tab)
	}
	else {
	    console.log("Error received")
	    console.log(error)
	}
    })
    console.log("end")
})


app.get('/download/:url/:balise', function (req, res) {
    var url = req.params.url
    var balise = req.params.balise
    url = decodeURIComponent(url)
    url = getEntireURI(url)
    console.log(url);
    console.log("balise ==>>", balise)
    request(url, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	    $ = cheerio.load(body)// Show the HTML for the Google homepage.
	    console.log($(balise))
    	    var tab = "attribute,text,html\n"
	    $(balise).each(function(i, elem) {
		var content = ""
    		for (key in elem.attribs) {
    		    content = content + key + "='" + elem.attribs[key] + "'/"
    		}
    		content = content + "," + $(this).text() + ","
    		content = content + $(this).html() + ","
		tab = tab + content + "\n"
	    })
		console.log(tab)
		res.send(tab)
	}
	else {
	    console.log("Error received")
	    console.log(error)
	}
    })
    console.log("end")
})


app.get('/:url/:balise', function (req, res) {
    var url = req.params.url
    var balise = req.params.balise
    url = decodeURIComponent(url)
    url = getEntireURI(url)
    console.log(url);
    console.log("balise ==>>", balise)
    request(url, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	    $ = cheerio.load(body)// Show the HTML for the Google homepage.
	    console.log($(balise))
    	    var tab = []
	    $(balise).each(function(i, elem) {
		var content = {}
    		for (key in elem.attribs) {
    		    content[key] = elem.attribs[key]
    		}
    		content.text = $(this).text()
    		content.html = $(this).html()
		tab[i] = content
	    })
		console.log(tab);
		res.json(tab)
	}
	else {
	    console.log("Error received")
	    console.log(error)
	}
    })
    console.log("end")
})

app.get('/:url/class/:balise', function (req, res) {
    var url = req.params.url
    var balise = "." + req.params.balise
    url = decodeURIComponent(url)
    url = getEntireURI(url)
    console.log(url)
    console.log(balise)
    request(url, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	    $ = cheerio.load(body)// Show the HTML for the Google homepage.
    	    var tab = []
	    console.log("balise ==>>", balise)
	    console.log($(balise))
	    $(balise).each(function(i, elem) {
		var content = {}
    		for (key in elem.attribs) {
    		    content[key] = elem.attribs[key]
    		}
		console.log($(this).html())
    		content.text = htmlEntities($(this).text())
    		content.html = htmlEntities($(this).html())
		tab[i] = content
	    })
		console.log("tab ==>>")
		console.log(tab)
		res.json(tab)
	}
	else {
	    console.log("Error received")
	    console.log(error)
	}
    })
    console.log("end")
})


app.get('/:url/id/:balise', function (req, res) {
    var url = req.params.url
    var balise = "#" + req.params.balise
    url = decodeURIComponent(url)
    url = getEntireURI(url)
    console.log(url)
    console.log(balise)
    request(url, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	    $ = cheerio.load(body)// Show the HTML for the Google homepage.
    	    var tab = []
	    console.log("balise ==>>", balise)
	    console.log($(balise))
	    $(balise).each(function(i, elem) {
		var content = {}
    		for (key in elem.attribs) {
    		    content[key] = elem.attribs[key]
    		}
		console.log($(this).html())
    		content.text = htmlEntities($(this).text())
    		content.html = htmlEntities($(this).html())
		tab[i] = content
	    })
		console.log("tab ==>>")
		console.log(tab)
		res.json(tab)
	}
	else {
	    console.log("Error received")
	    console.log(error)
	}
    })
    console.log("end")
})

app.listen(8080, function() {

    console.log('ça tourne')

})

function getEntireURI(uri) {
    var url = "";

    if (uri.substring(0, 12) == "https://www." ||
	uri.substring(0, 11) == "http://www." || 
	uri.substring(0, 8) == "https://") {

	return uri;

    } else {

	if (uri.substring(0, 4) == "www.")
	    return "http://" + uri;

	return "http://www." + uri;

    }
}

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
