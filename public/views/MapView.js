define(['backbone', 'handlebars', '../templates/map', '../models/map'], function(Backbone, Handlebars, MapTemplate, Map){
  var MapView = Backbone.View.extend({
    template: Handlebars.compile(MapTemplate)(),

    initialize: function(options){
      this.render();
      var map = new Map({currentPlayer: options.currentPlayer, socket: options.socket});
      options.game.set('map', map);
      this.model = map;
    },

    render: function(){
      $('#game .content').append(this.template);
      return this;
    }

  });
  return MapView;
});
