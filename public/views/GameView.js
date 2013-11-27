define(['backbone', 'handlebars', 'text!../templates/game.html'], function(Backbone, Handlebars, GameTemplate){
  var GameView = Backbone.View.extend({
    template: GameTemplate,

    initialize: function(){
    },

    render: function(){
      this.el = Handlebars.compile(this.template);
      return this;
    }

  });
  return GameView;
});
