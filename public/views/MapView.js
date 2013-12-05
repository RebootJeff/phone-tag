define(['backbone', 'handlebars', 'text!../templates/map.html', '../models/map'], function(Backbone, Handlebars, MapTemplate, Map){
  var MapView = Backbone.View.extend({
    template: MapTemplate,

    initialize: function(options){
      this.render();
      var map = new Map({currentPlayer: options.currentPlayer, socket: options.socket});
      options.game.set('map', map);
      this.model = map;
    },

    render: function(){
      $('#game .content').append(Handlebars.compile(this.template)());
      return this;
    }

  });
  return MapView;
});
