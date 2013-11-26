define(['backbone', '../templates/game'], function(Backbone, GameTemplate){
  var GameView = Backbone.View.extend({
    template: GameTemplate,

    initialize: function(){
    },

    render: function(){
      this.el = (this.template());
      return this;
    }

  });
  return GameView;
});
