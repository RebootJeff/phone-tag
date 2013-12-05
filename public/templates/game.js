define(function(){
  return "<section id='loadingView' class='page center'>" +
    "<header class='header'>" +
    "</header>" +
    "<section class='content'>" +
      "<h1>Loading</h1>" +
      "<img src='../styles/images/loading.gif'>" +
    "</section>" +
  "</section>" +

  "<section id='game' class='page right'>" +
    "<header class='header'>" +
      "<a class='quit' href='#'>Quit</a>" +
      "<h1>Map</h1>" +
      "<a class='inventory' href='#inventory'>Inventory</a>" +
    "</header>" +
    "<section class='content'>" +
      "<button class='toggleModal'>Map Controls</button>" +
      "<button class='tag'>Tag</button>" +
    "</section>" +
  "</section>" +

  "<section id='inventory' class='page right'>" +
    "<header class='header'>" +
      "<h1>Inventory</h1>" +
      "<a class='game' href='#'>Back</a>" +
    "</header>" +
    "<section class='content'>" +
      "<ul>" +
        "<li>Invisibility</li>" +
        "<li>Invincibility</li>" +
        "<li>Bombs</li>" +
        "<li>Ken</li>" +
      "</ul>" +
    "</section>" +
  "</section>" +

  "<section class='hidden modal closed'>" +
    "<h1>Search Controls</h1>" +
    "<button class='toggleModal'>X</button>" +
    "<button class='centerMap'><img src='../styles/images/map-center.png'></button>" +
    "<button class='zoomOut' href='#'>-</button>" +
    "<button class='zoomIn' href='#'>+</button>" +
  "</section>";
});
