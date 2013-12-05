define(['backbone', 'handlebars', '../templates/game','./MapView'], function(Backbone, Handlebars, GameTemplate, MapView){
  var GameView = Backbone.View.extend({
    template: Handlebars.compile(GameTemplate),

    initialize: function(options){
      this.render();
      new MapView({currentPlayer: this.model.get('currentPlayer'), game: this.model, socket: options.socket});
    },

    render: function(){
      $('#container').html(this.template);
      return this;
    }

  });
  return GameView;
});
