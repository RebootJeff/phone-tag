define(['handlebars'], function(Handlebars){
  var content =
    "<div data-role='page' id='game'>"+
      "<div data-role='header'>"+
        "<a class='home' href='#home'>Quit</a>"+
        "<a class='inventory' href='#inventory'>Inventory</a>"+
        "<h1>Map</h1>"+
      "</div>"+

      "<div data-role='content'>"+
        "<section id='map-canvas' style='width: 100%; height:32em'></section>"+
        "<button class='tag'>Tag</button>"+
      "</div>"+
    "</div>"+

    "<div data-role='page' id='inventory'>"+
      "<div data-role='header'>"+
        "<h1>Inventory</h1>"+
        "<a class='game' href='#game'>Back</a>"+
      "</div>"+

      "<div data-role='content'>"+
        "<ul data-role='listview'>"+
          "<li>Invisibility</li>"+
          "<li>Invincibility</li>"+
          "<li>Bombs</li>"+
          "<li>Ken</li>"+
        "</ul>"+
      "</div>"+
    "</div>";
  return Handlebars.compile(content);
});
