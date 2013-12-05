define(['backbone', 'handlebars', 'text!../templates/game.html','./MapView'], function(Backbone, Handlebars, GameTemplate, MapView){
  var GameView = Backbone.View.extend({
    template: GameTemplate,

    initialize: function(options){
      this.render();
      new MapView({currentPlayer: this.model.get('currentPlayer'), game: this.model, socket: options.socket});
    },

    render: function(){
      $('#container').html(Handlebars.compile(this.template));
      return this;
    }

  });
  return GameView;
});
