// Utilisation de la librairie spin.js pour générer le spinner
var opts = {
    lines: 13 // The number of lines to draw
    , length: 28 // The length of each line
    , width: 14 // The line thickness
    , radius: 42 // The radius of the inner circle
    , scale: 1 // Scales overall size of the spinner
    , corners: 1 // Corner roundness (0..1)
    , color: '#000' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
}



$("#form").submit(function(e){
    e.preventDefault();

    var url = $("#url").val();
    var base_url = url;
    var balise = $("#balise").val();
    url = encodeURIComponent(url);
    balise = encodeURIComponent(balise);
    var myTag = $("#tag").prop("checked");
    var myId = $("#id").prop("checked");
    var myClass = $("#class").prop("checked");
    
    var target = document.getElementById('chargement');
    var spinner = new Spinner(opts).spin(target);
    $("#affichage").fadeOut(1000);
    $("#affichage").empty();
    $("#telechargement").fadeOut(1000);
    $("#telechargement").empty();
    $("#chargement").fadeIn(1000);
    var string;
    var type = (myTag == true) ? "" : (myId == true) ? "/id" : "/class";
    console.log('http://vps355652.ovh.net:8080/' + url + type + '/' + balise);
    $.getJSON('http://vps355652.ovh.net:8080/' + url + type +  '/' + balise, function(result){
	console.log(result);
        $.each(result, function(i, field){
            string = "<div class='content'>";
	    
            $.each(field, function(i, value){
		if (i == "href") {
                    if (value[0] == '/' || value[0] == '#') {
			string = string + "<p class='line'><p class='clef'>" + i + ":</p><p class='valeur'><a href='" + base_url + value + "'>" + value + "</a></p></p>";
		    } else {
			string = string + "<p class='line'><p class='clef'>" + i + ":</p><p class='valeur'><a href='" + value + "'>" + value + "</a></p></p>";
		    }
		}
		else if (i == "html") {
                    string = string + "<p class='line'><p class='clef'>" + i + ":</p><p class='valeur'>" + value + "</p></p>";
		    
		} else {
                    string = string + "<p class='line'><p class='clef'>" + i + ":</p><p class='valeur'>" + value + "</p></p>";

		}
            })

		console.log(string);
		string = string + "</div>";
            $('#affichage').append(string+"<br />");
	    
        });

	$('#telechargement').append("<a href='http://vps355652.ovh.net:8080/download/" + url + type + "/" + balise + "' download='" + balise + ".csv'>Telecharger au format csv</a>");
	$("#chargement").fadeOut(1500);
	$("#telechargement").fadeIn(1500);
	$("#affichage").fadeIn(1500);
	
    });

    console.log("test");
    return false;
});
