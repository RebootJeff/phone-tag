define(['handlebars','jqueryMobile'], function(Handlebars, jqueryMobile){
  var content =
    "<div data-role='page' id='home'>"+
      "<div data-role='header'>"+
        "<h1>Home</h1>"+
      "</div>"+

      "<div data-role='content'>"+
        "<p><a href='#about'>About this app</a></p>"+
      "</div>"+
    "</div>"+

    "<div data-role='page' id='about'>"+
      "<div data-role='header'>"+
        "<h1>About This App</h1>"+
        "<a href='/logout'>Logout</a>"+
      "</div>"+

      "<div data-role='content'>"+
        "<p>This app rocks! <a href='#home'>Go home</a></p>"+
      "</div>"+
    "</div>";
  return Handlebars.compile("<h1>Test message</h1>");
});
