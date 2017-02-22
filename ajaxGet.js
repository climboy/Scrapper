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
        console.log("test");

     var url = $("#url").val();
     var base_url = url;
     var balise = $("#balise").val();
     url = encodeURIComponent(url);
     console.log("test ==> ", url);

    var target = document.getElementById('chargement');
    var spinner = new Spinner(opts).spin(target);
    $("#affichage").fadeOut(1000);
    $("#affichage").empty();
    $("#chargement").fadeIn(1000);
     var string;
     $.getJSON( 'http://localhost:8080/'+url+'/'+balise, function(result){
        $.each(result, function(i, field){
          string = "<div class='content'>";

            $.each(field, function(i, value){
              if (i == "href") {
                if (value[0] == '/' || value[0] == '#') {
                string = string + "<p class='line'><p class='clef'>" + i + ":</p><p class='valeur'><a href='" + base_url + value + "'>" + value + "</a></p></p>";
              }
              else {
                string = string + "<p class='line'><p class='clef'>" + i + ":</p><p class='valeur'><a href='" + value + "'>" + value + "</a></p></p>";
              }
              }
              else if (i == "html") {
                string = string + "<p class='line'><p class='clef'>" + i + ":</p><p class='valeur'><code>" + value + "</code></p></p>";

              } else {
                string = string + "<p class='line'><p class='clef'>" + i + ":</p><p class='valeur'>" + value + "</p></p>";

              }
            })

            string = string + "</div>"
            $('#affichage').append(string+"<br />");
            console.log("test ==> ", string);
        });

     $("#chargement").fadeOut(1500);
     $("#affichage").fadeIn(1500);
     console.log("test");

    });

    console.log("test");
     return false;
   });
