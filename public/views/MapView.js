define(['backbone', 'handlebars', 'text!../templates/map.html', '../models/Map'], function(Backbone, Handlebars, MapTemplate, Map){
  var MapView = Backbone.View.extend({
    template: MapTemplate,

    initialize: function(options){
      this.render();
      this.model = new Map({currentPlayer: options.currentPlayer, socket: options.socket});
    },

    render: function(){
      $('#game .content').prepend(Handlebars.compile(this.template)());
      return this;
    }

  });
  return MapView;
});
