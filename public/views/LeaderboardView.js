define(['backbone', 'handlebars', 'text!../templates/inventory.html'], function(Backbone, Handlebars, LeaderboardTemplate){
  var LeaderboardView = Backbone.View.extend({
    template: LeaderboardTemplate,

    initialize: function(){
    },

    render: function(){
      this.el = Handlebars.compile(this.template);
      return this;
    }

  });
  return LeaderboardView;
});
