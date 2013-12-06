define(function(){
  /*jshint multistr: true */
  return "<section id='loadingView' class='page center'> \
    <header class='header'> \
    </header> \
    <section class='content'> \
      <h1>Loading</h1> \
      <img src='../styles/images/loading.gif'> \
    </section> \
  </section> \
  \
  <section id='game' class='page right'> \
    <header class='header'> \
      <button class='quit'><img src='../styles/images/exit.png'></button> \
      <button class='inventory'><img src='../styles/images/cabinet.png'></button> \
    </header> \
    <section class='content'> \
      <button class='toggleModal'><img src='../styles/images/map.png'></button> \
      <button class='tag'>Tag</button> \
      <button class='powerUp'><img src='../styles/images/lightning.png'</button> \
    </section> \
  </section> \
  \
  <section id='inventory' class='page right'> \
    <header class='header'> \
      <h1>Inventory</h1> \
      <a class='game' href='#'>Back</a> \
    </header> \
    <section class='content'> \
      <ul> \
        <li>Invisibility</li> \
        <li>Invincibility</li> \
        <li>Bombs</li> \
        <li>Ken</li> \
      </ul> \
    </section> \
  </section> \
  \
  <section class='modal closed'> \
    <h1>Search Controls</h1> \
    <button class='toggleModal'><img src='../styles/images/cancel-circle.png'></button> \
    <button class='centerMap'><img src='../styles/images/map-center.png'></button> \
    <button class='zoomOut'><img src='../styles/images/minus.png'></button> \
    <button class='zoomIn'><img src='../styles/images/plus.png'></button> \
  </section>";
});
